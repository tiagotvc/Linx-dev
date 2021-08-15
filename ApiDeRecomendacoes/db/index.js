 /* -- Arquivo de Conexão do Mongo --
 
    Responsável pela conexão ao Mongo em container.
    A variável {local} serve apenas para testes sem container.

    Criado: 2021/08/14

    Por: Tiago Machado Carvalho */

    /* const mongoose = require('mongoose');
    const container = 'mongo';
    const local = '127.0.0.1';
    
    mongoose
        .connect(`mongodb://${container}:27017/local`, { useUnifiedTopology: true , useNewUrlParser: true })
        .catch(e => {
            console.error('Connection error', e.message)
        })
    
    const db = mongoose.connection
    
    module.exports = db */