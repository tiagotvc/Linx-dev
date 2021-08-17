 /* -- Arquivo Controller de Produtos --

    Responsável pelas regras de negócio da Api.

    Criado: 2021/08/14

    Por: Tiago Machado Carvalho */

    //const redis = require('../cache/redis-client');

const axios = require('axios');
const redis = require('../cache/redis-client');
let firsts;
let first = '';
let second = '';
let seconds;
let allProduct;
let allProducts = '';
let cache = false;

 
async function cacheInitialize(){

     /** Consulta a Api de Catalogo, mas sem ID, para tornar o processo mais veloz
     * optei por trazer a lista inteira de produtos e guarda-la em cache, dessa
     * forma é evitado que precise ser feito uma busca por cada id dentro da API,
     * tentei fazer dessa forma mas é simplesmente inviavel. Para funcionar criei
     * um novo type chamado microservice e passo o id como 0 (poderia ser qualquer id
     * pois o campo que será o identificador é  o type) ** Cabe uma melhoria aqui
     * mas o tempo está curto.
     */

    let type = 'microservice';

    const info = await axios.get('http://localhost:3001/api/products/'+ 0 + '/' + type)

    await redis.setAsync(allProducts, JSON.stringify(info.data));
    await redis.exAsync(allProducts, 1200);
    allProduct = await redis.getAsync(allProducts);



    /**Consulta as duas listas de id */
    
    
    const fisrtList = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json');
    await redis.setAsync(first, JSON.stringify(fisrtList.data));
    await redis.exAsync(first, 1200);
    firsts = await redis.getAsync(first);



    const secondList = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json');
    await redis.setAsync(second, JSON.stringify(secondList.data));
    await redis.exAsync(second, 1200);
    seconds = await redis.getAsync(second);


    
    return "done";
}

    
getRecommendations = async (req, res) => {

    /**Bloco responsável por limpar o cache caso o sistema seja reiniciado
     * apenas para garantir que nada fique no cache quando o sistema passar 
     * por um reboot.
     */

    if(!cache){
        redis.delAsync(first);
        redis.delAsync(second);
        redis.delAsync(allProducts);
        
        await cacheInitialize();
    
        //Mantive o console pois ele indica quando o cache é limpo!
        console.log("Clean cache!");

    }


    console.log(allProduct)



    /** A const validade retorna o valor salvo em cache de produtos,
     * abaixo dele é feito uma validação se existem dados nele, caso
     * sim a variavel products recebe o valor dele em forma de JSON
     * caso não tenha valor é chamado a função que consulta a API de
     * catalogo.
     */

    



    

      
    //const {maxItens, type} = query;

   /*  let firstList = JSON.parse(await rediss.getAsync(first));
    let secondList = JSON.parse(await rediss.getAsync(second)); */


    const mostPopular = [];
    const priceReduction = [];

    let IdLists;

  /*   if(firstList == null ||firstList == undefined || secondList == null || secondList == undefined){

        IdLists = await cacheInitialize(); 
        firstList = IdLists[0];
        secondList = IdLists[1];
    } */


    //const validate = await rediss.getAsync(allProducts);

    
    let products =  await callApi();

    console.log(products)

    const fisrtList = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json');


    console.log(fisrtList)


    /* await Promise.all(firstList.map((list) => {

        
        products.map((prod)=>{
            console.log(prod)
         if(prod.id === list){
            mostPopular.push(prod)
         }

        })
        
        
    }))   */


    

    /* await Promise.all(secondList.map(async (products) => {



        
    }))

     */


        return "nada"

        //return res.json({list_1: mostPopular, list_2:priceReduction})
    }
    
    module.exports = {
        getRecommendations,  
    }