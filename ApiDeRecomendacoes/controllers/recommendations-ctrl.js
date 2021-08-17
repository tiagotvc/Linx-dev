 /* -- Arquivo Controller de Produtos --

    Responsável pelas regras de negócio da Api.

    Criado: 2021/08/14

    Por: Tiago Machado Carvalho */

    //const redis = require('../cache/redis-client');

const axios = require('axios');
let prd = '';
let cache = false;
const redis = require('../cache/redis-client');
   
async function cacheInitialize(){

    /**Consulta as duas listas de id */

    const fisrtList = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json');
    const secondList = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json');

    let lists = [];

    /**Salva as listas no cache */

    await redis.setAsync(fisrt, JSON.stringify(fisrtList.data));
    await redis.setAsync(second, JSON.stringify(secondList.data));

    /**Seta o tempo que as listas ficarão no cache */

    await redis.exAsync(fisrt, 1200);
    await redis.exAsync(second, 1200);

    lists.push({first:fisrtList});
    lists.push({first:secondList});

    return lists

}

    
getRecommendations = async (req, res) => {
      
    //const {maxItens, type} = query;

    const firstList = JSON.parse(await redis.getAsync(first));
    const secondList = JSON.parse(await redis.getAsync(second));
    const mostPopular = [];
    const priceReduction = [];

    let IdLists;
    let type = 'complete';

    if(firstList === 'undefined' || secondList === 'undefine'){

        IdLists = await cacheInitialize();  
    }

    
    console.log(IdLists)
    //const delay = ms => new Promise(res => setTimeout(res, ms));

    /* await Promise.all(fisrtList.data.map(async (mostPopularId) => {
             
        const info = await axios.get('http://localhost:3001/api/products/'+ mostPopularId.recommendedProduct.id + '/' + type)
        .then((sucesso)=>{
                return sucesso.data
        })
        .catch((erro)=>{
                 return erro
        }) 

        if(info.sucess){
            if(info.product.status === 'AVAILABLE'){
                mostPopular.push(info.product)
            }
        }
        }))  

    
        
    console.log(secondList.data);

    await Promise.all(fisrtList.data.map(async (reductionId) => {
             
        const sinfo = await axios.get('http://localhost:3001/api/products/'+ reductionId.recommendedProduct.id + '/' + type)
        .then((sucesso)=>{
                return sucesso.data
        })
        .catch((erro)=>{
                return erro
        }) 
    
        if(sinfo.sucess){
            if(sinfo.product.status === 'AVAILABLE'){
                priceReduction.push(sinfo.product)
            }
        }
    }))   */

        return res.json({lists});

        //return res.json({list_1: mostPopular, list_2:priceReduction})
    }
    
    module.exports = {
        getRecommendations,  
    }