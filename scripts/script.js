/**
 * Arquivo de script do Mongo
 * Criado para inserir os dados contidos no catalog.json
 * para dentro do banco de dados.
 * 
 * Data:2021/08/17
 * Criador: Tiago Machado Carvalho
 * 
 * Como utilizar:
 * Estando na pasta raiz do projeto
 * No prompt de commando do vscode 
 * Digite:
 * 
 * cd scripts
 * node script.js
 */


const Product = require('../ApiDeCatalogo/models/product-model');
let dbData = require('./catalog.json');

async function databaseInitialize(){

    await dbData.forEach(async function (doc, i) {

        let id = i + 1;
        let itens = { _id:id , stringDocument:doc};

        const product = new Product(itens);

        product
            .save()
            .then(() => {
                console.log("document inserted " + product._id);
            })
            .catch((error) => {
                console.log("document not inserted " + error);
            })
      });
}

databaseInitialize();