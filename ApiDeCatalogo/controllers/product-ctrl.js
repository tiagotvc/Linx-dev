/**
 * Arquivo de controler da API de catalogo 
 * 
 * Contém todas as regras de negócio da API.
 * 
 * Data de criação:2021/08/15
 * 
 * Ultimo Update:2021/08/17
 * -- Mudança: Feito code review, enxugado regras de negócio,
 *    refatorado lógica de cache para aumento de velocidade
 *    de resposta.
 * 
 * Criador: Tiago Machado Carvalho
 * 
 */


const Product = require('../models/product-model');
const redis = require('../cache/redis-client');
let prd = '';
let cache = false;
let data = '';
    
    
    /* Função que retorna todos os produtos cadastrados no mongo,
        também grava os produtos em uma string dentro do cache
        utilizando o redis */


async function cacheInitialize(){
    
    await Product.find({}, async (err, products) => {
        if (err) {
            return err
        }
        if (!products.length) {
           
            data = {mensagem:"Db is empty"};
        }
        else{

            data = products;
            await redis.setAsync(prd, JSON.stringify(data));
            await redis.exAsync(prd, 1200);
            data = JSON.parse(await redis.getAsync(prd));
            cache = true;

        }
            
    }).catch(err => console.log(err))


    return "done";
} 
    
    
    /* Função responsável por criar o body do produto
       cria de acordo com o parametro complete, caso seja
       true irá criar o body completo, caso seja false
       irá criar o body no modo compact */ 
    
async function handlerBody(type, id, data){

   let body = {}

   console.log(data)

   return new Promise(function (resolve,reject) {
        for(let i = 0;i< data.length;i++){
            if(type === 'complete'){
                if(data[i].stringDocument.id === id){
                    body = data[i].stringDocument;
                    i = data.length + 1 ;
                }
            }else{
                if(data[i].stringDocument.id === id){
                    body = {
                        name:data[i].stringDocument.name,
                        price:data[i].stringDocument.price,
                        status:data[i].stringDocument.status,
                        categories:data[i].stringDocument.categories,
                    };
                    i = data.length + 1 ;
                }
            } 
            }resolve({
                body
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

    const {id , type} = req.params

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
        await cacheInitialize();

        //Mantive o console pois ele indica quando o cache é limpo!
        console.log("Clean cache!")
    }
    
    const product_body = await handlerBody(type, id, data);


    if(product_body.body.name){
       
    
        return res.status(200).json({sucess:true, product:product_body}); 
        
    
    }else {
    

        return res.status(404).json({sucess:false, error:`Product not found`});
            
    }
}
    
    module.exports = {
        getProductById,  
    }