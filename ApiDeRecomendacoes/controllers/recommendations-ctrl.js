/**
 * Arquivo de criação do cliente Redis 
 * 
 * Cria a conexão do Redis e altera as funções
 * para que respondam de forma asyncrona.
 * 
 * Data de criação:2021/08/15
 * 
 * 
 * Criador: Tiago Machado Carvalho
 * 
 */

const axios = require('axios');
const redis = require('../cache/redis-client');
let first_List = '';
let second_List = '';
let cache_firstList = '';
let cache_secondList = '';
let max = '';
let maxProd = '';


let cache = false;
let type = 'complete';

 
async function cacheInitialize(maxItens){

    cache = true;

    /** Aqui as duas consultas para retornar os Ids de mostPopular.json e pricereduction.json */
    
    const fisrtList = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json');
    const secondList = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json');

    
    /** Arrays que irão receber todos os ids retornados nas funções anteriores */

    let firstArray = [];
    let secondArray = [];


    /** Feito Maps para jogar os ids retornados nas requisições para dentro dos arrays criados acima */

    await fisrtList.data.map((list) =>{
        firstArray.push(list.recommendedProduct.id);
    });

    await secondList.data.map((list) =>{
        secondArray.push(list.recommendedProduct.id);
    });

    /** Utilizado slice para criar dois novos arrays contendo apenas a quantidade de ids solicitados
     * via query no front para cada listagem.
     */

    const array = firstArray.slice(0,maxItens);
    const newArray = secondArray.slice(0,maxItens);


    /** < ------------------------------------------------- >  */


    /** Consultas feitas na Api de catálogo para trazer os produtos
       * através dos ids que foram formados acima e depois salva os
       * produtos dentro do cache para aumentar a velocidade da 
       * API.
     */

    let mostPopularList = []

    await Promise.all(array.map(async function (doc, i) {

        try{
            const info = await axios.get('http://localhost:3001/api/products/'+ doc + '/' + type)
            if(info.data.sucess){
                if(info.data.product.body.status === 'AVAILABLE'){
                    mostPopularList.push(info.data.product.body);
                }
            }

        }catch(err){
            console.log("id " + doc + " not found in catalog");

        }
    })); 

    await redis.setAsync(first_List, JSON.stringify(mostPopularList));
    await redis.exAsync(first_List, 1200);
    cache_firstList = JSON.parse(await redis.getAsync(first_List));


    let priceReducedList = []

    await Promise.all(newArray.map(async function (doc, i) {

        try{
            const info = await axios.get('http://localhost:3001/api/products/'+ doc + '/' + type)
            if(info.data.sucess){
                if(info.data.product.body.status === 'AVAILABLE'){
                    priceReducedList.push(info.data.product.body);
                }
            }

        }catch(err){
            console.log("id " + doc + " not found in catalog");

        }
    }));

    await redis.setAsync(second_List, JSON.stringify(priceReducedList));
    await redis.exAsync(second_List, 1200);
    cache_secondList = JSON.parse(await redis.getAsync(second_List));


    /** cache da ultima quantidade de produtos requisitada */

    await redis.setAsync(max, maxItens);
    await redis.exAsync(max, 1200);
    maxProd = await redis.getAsync(max);
       
    return "done";
}

    
getRecommendations = async (req, res) => {

    /** Pega a quantidade de itens requisitados pelo front via query */

    const {maxProducts} = req.query;

  
    /** 
     * Valida se a quantidade enviada na query é menor que 10, caso seja menor
     * e setado o número 10
     */

    if(maxProducts < 10){

        maxProducts = 10;

    }

    /**
     * Acrescentado validação para quando valor da variavel maxProducts é alterada no front
     * é alterado valor de cache para false, forçando a rodar novamente a logica de cache.
     */
    
    if(cache == true && maxProducts != maxProd ){

        cache = false;
    }


    /**Bloco responsável por limpar o cache caso o sistema seja reiniciado
     * apenas para garantir que nada fique no cache quando o sistema passar 
     * por um reboot.
     */


    if(!cache){
        await redis.delAsync(first_List);
        await redis.delAsync(second_List);
        await redis.delAsync(max);

        await cacheInitialize(maxProducts);
    
        //Mantive o console pois ele indica quando o cache é limpo!
        console.log("Clean cache!");

    }


    return res.json({
        mostPopular:cache_firstList,
        priceReduced:cache_secondList
    });

        //return res.json({list_1: mostPopular, list_2:priceReduction})
    }
    
    module.exports = {
        getRecommendations,  
    }