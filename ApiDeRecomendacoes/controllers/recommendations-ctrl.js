 /* -- Arquivo Controller de Produtos --

    Responsável pelas regras de negócio da Api.

    Criado: 2021/08/14

    Por: Tiago Machado Carvalho */

    //const redis = require('../cache/redis-client');
    const axios = require('axios');
    let prd = '';
    let cache = false;
   

    
    getRecommendations = async (req, res) => {
      
    

        const mostPopular = [];
        const priceReduction = [];
        let type = 'complete';

        const delay = ms => new Promise(res => setTimeout(res, ms));

         const fisrtList = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json');
       
         await Promise.all(fisrtList.data.map(async (mostPopularId) => {
             
            await delay(1000);

            const info = await axios.get('http://localhost:3001/api/products/'+ mostPopularId.recommendedProduct.id + '/' + type)
            .then((sucesso)=>{
                return sucesso.data
            })
            .catch((erro)=>{
                 return erro
            }) 

            mostPopular.append(info)


        }))  

        /* console.log(mostPopular) */

         /* console.log(mostPopular)

        const secondList = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json')
        
        await Promise.all(secondList.data.map((priceReductionId)=>{
            priceReduction.push(priceReductionId.recommendedProduct.id);
        }))   */

        return res.json(info)
    }
    
    module.exports = {
        getRecommendations,  
    }