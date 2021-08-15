 /* -- Arquivo Controller de Produtos --

    Responsável pelas regras de negócio da Api.

    Criado: 2021/08/14

    Por: Tiago Machado Carvalho */

    //const redis = require('../cache/redis-client');
    const axios = require('axios');
    let prd = '';
    let cache = false;

    
    
    /* Função que retorna todos os produtos cadastrados no mongo,
        também grava os produtos em uma string dentro do cache
        utilizando o redis */
     
  
    
    /* API de produto, espera um ID e um TYPE como parametro e retorna 
       um produto que pode ser complete (contendo todos os campos do model)
       ou compact (contendo apenas alguns campos do model).
       Tem como retorno um JSON contendo os respectivos campos do model
       e o status de sucess true ou false e o status da requisição que pode
       ser 200 ou 404 , no caso do 404 retorna uma mensagem no lugar dos
       campos */
    
    
    getRecommendations = async (req, res) => {
    
        /* A variável (cache) sempre inicia como false , para que toda vez que o container
          for iniciado o cache seja totalmente limpo, deixei apenas para garantir que na 
          primeira interação o sistema consulte o banco , após essa primeira interação a
          variavel se torna true até que o container seja parado, a partir desse momento
          o cache onde é guardado todos os produtos expira a cada 2 minutos, ou seja após
          a primeira consulta no banco durante dois minutos a api irá consultar o cache 
          dando a api um ganho consideravel de velocidade , fazendo com que a api suporte
          mais requisições por minuto, o retorno da api é bem rapida mesmo sem o cache,
          mas é em torno de  50% mais rápida com ele*/
    
        
        const datas = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json')
        console.log(datas);
    
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
        getRecommendations,  
    }