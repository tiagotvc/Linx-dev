 /* -- Arquivo Controller de Produtos --

    Responsável pelas regras de negócio da Api.

    Criado: 2021/08/14

    Por: Tiago Machado Carvalho */


const Product = require('../models/product-model');
const redis = require('../cache/redis-client');
let prd = '';
let cache = false;
let dbData = require('./catalog.json');
    
    
    /* Função que retorna todos os produtos cadastrados no mongo,
        também grava os produtos em uma string dentro do cache
        utilizando o redis */


async function databaseInitialize(){

    console.log("This is the first interaction with the API")

    for(let j= 0;j < dbData.length; j++){

        let id = j + 1;
        let document = JSON.stringify(dbData[j]);

        let itens = { _id:id , stringDocument:document};

        const product = new Product(itens);

        product
            .save()
            .then(() => {
                console.log("document inserted " + product._id);
            })
            .catch((error) => {
                console.log("document not inserted " + error);
            })
    }
}

     

async function getAllProducts(){
    
    let data ;
    
    await Product.find({}, async (err, products) => {
        if (err) {
            return err
        }
        if (!products.length) {

            /**
            * Na primeira interação com a API o banco estará vazio, então roda
            * a função abaixo que insere os dados que estão no arquivo JSON para 
            * dentro do Mongo.
            * Obs: Essa função só irá rodar a primeira vez que a imagem do mongo
            * for montada, depois só rodará novamente caso a imagem seja excluida
            * ou seja feito um rebuild.
            *  */ 

            await databaseInitialize();
                
            /** Para não consultar o banco novamente é salvo os dados do
            * JSON dentro da variável data, desse forma os dados serão
            * armazenados no REDIS por 1200 ms e após esse tempo o banco
            * será consultado, mas dessa vez teremos dados.
            */

            data = dbData;

        }
        else{

            data = products;
               
        }
            
    }).catch(err => console.log(err))

    if(data != undefined && data!= '' && data != null){
    
        await redis.setAsync(prd, JSON.stringify(data));
        await redis.exAsync(prd, 1200);
    }

    return data;
} 
    
    
    /* Função responsável por criar o body do produto
       cria de acordo com o parametro complete, caso seja
       true irá criar o body completo, caso seja false
       irá criar o body no modo compact */ 
    
async function handlerBody(complete, _id , data){

    const id = _id;
    let temp_body = {};
    
    return new Promise(function (resolve,reject) {
        for(let i = 0;i< data.length;i++){

            let temp_data = JSON.parse(data[i].stringDocument);

            if(complete){
                if(temp_data.id === id){
                    temp_body = temp_data;
                    i = data.length + 1;
                }
            }else{
                if(temp_data.id === id){
                    temp_body = {
                        name:temp_data.name,
                        price:temp_data.price,
                        status:temp_data.status,
                        categories:temp_data.categories,
                    };
                }
            }
                
        }resolve({
            temp_body
        });
    }); 
}
    
    
    /* API de produto, espera um ID e um TYPE como parametro e retorna 
       um produto que pode ser complete (contendo todos os campos do model)
       ou compact (contendo apenas alguns campos do model).
       Tem como retorno um JSON contendo os respectivos campos do model
       e o status de sucess true ou false e o status da requisição que pode
       ser 200 ou 404 , no caso do 404 retorna uma mensagem no lugar dos
       campos */
    
getProductById = async (req, res) => {
    
    /* A variável (cache) sempre inicia como false , para que toda vez que o container
    for iniciado o cache seja totalmente limpo, deixei apenas para garantir que na 
    primeira interação o sistema consulte o banco , após essa primeira interação a
    variavel se torna true até que o container seja parado, a partir desse momento
    o cache onde é guardado todos os produtos expira a cada 1200 ms, ou seja após
    a primeira consulta no banco durante 1200 ms a api irá consultar o cache 
    dando a api um ganho consideravel de velocidade , fazendo com que a api suporte
    mais requisições por minuto, o retorno da api é bem rapida mesmo sem o cache,
    mas é em torno de  50% mais rápida com ele*/
    
    if(!cache){
        redis.delAsync(prd);
        cache = true;
    
        //Mantive o console pois ele indica quando o cache é limpo!
        console.log("Clean cache!")
    }

    
        
    const _id = req.params.id;
    
    const complete = req.params.type === 'complete'? true : false;
    
    const rawData = await redis.getAsync(prd);

    const data = rawData? JSON.parse(rawData): await getAllProducts();
        
    const product_body = await handlerBody(complete, _id, data);

    
    if(product_body.temp_body.name){
       
    
        return res.status(200).json({sucess:true, product:product_body.temp_body}); 
        
    
    }else {
    

        return res.status(404).json({sucess:false, error:`Product not found`});
            
    }
}
    
    module.exports = {
        getProductById,  
    }