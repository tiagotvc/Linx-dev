 /* -- Arquivo Controller de Produtos --

    Responsável pelas regras de negócio da Api.

    Criado: 2021/08/14

    Por: Tiago Machado Carvalho */

    //const redis = require('../cache/redis-client');

const axios = require('axios');
let first = 'undefined';
let second = 'undefined';
let cache = false;
const redis = require('../cache/redis-client');
   
async function cacheInitialize(){

    /**Consulta as duas listas de id */

    const fisrtList = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json');
    const secondList = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json');

    let lists = [];

    /**Salva as listas no cache */

    await redis.setAsync(first, JSON.stringify(fisrtList.data));
    await redis.setAsync(second, JSON.stringify(secondList.data));

    /**Seta o tempo que as listas ficarão no cache */

    await redis.exAsync(first, 1200);
    await redis.exAsync(second, 1200);

    lists.push(fisrtList.data);
    lists.push(secondList.data);

    return lists
}

    
getRecommendations = async (req, res) => {

    if(!cache){
        redis.delAsync(first);
        redis.delAsync(second);
        cache = true;
    
        //Mantive o console pois ele indica quando o cache é limpo!
        console.log("Clean cache!");
    }

      
    //const {maxItens, type} = query;

    let firstList = JSON.parse(await redis.getAsync(first));
    let secondList = JSON.parse(await redis.getAsync(second));
    const mostPopular = [];
    const priceReduction = [];

    let IdLists;
    let type = 'microservice';
    let allIds = []


    if(firstList == null ||firstList == undefined || secondList == null || secondList == undefined){

        IdLists = await cacheInitialize(); 
        firstList = IdLists[0];
        secondList = IdLists[1];
    }

    /** Consulta a Api de Catalogo, mas sem ID, para tornar o processo mais veloz
     * optei por trazer a lista inteira de produtos e guarda-la em cache, dessa
     * forma é evitado que precise ser feito uma busca por cada id dentro da API,
     * tentei fazer dessa forma mas é simplesmente inviavel. Para funcionar criei
     * um novo type chamado microservice e passo o id como 0 (poderia ser qualquer id
     * pois o campo que será o identificador é  o type)
     */

    const info = await axios.get('http://localhost:3001/api/products/'+ 0 + '/' + type)
        .then((sucesso)=>{
                return sucesso.data
        })
        .catch((erro)=>{
                 return erro
        }) 

        console.log(info)




    /* const delay = ms => new Promise(res => setTimeout(res, ms));

    await Promise.all(firstList.map(async (mostPopularId) => {

        await delay(3000);

        

        if(info.sucess){
            if(info.product.status === 'AVAILABLE'){
                mostPopular.push(info.product)
            }
        }
        }))  


    await Promise.all(secondList.map(async (reductionId) => {
             
        await delay(1500);
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
    }))    */

        return res.json(delta);

        //return res.json({list_1: mostPopular, list_2:priceReduction})
    }
    
    module.exports = {
        getRecommendations,  
    }