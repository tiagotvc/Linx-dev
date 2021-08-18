/**
 * Arquivo de conexão do mongo
 * 
 * Cria a conexão com o mongo
 * 
 * Data de criação:2021/08/15
 * 
 * Criador: Tiago Machado Carvalho
 * 
 */

const mongoose = require('mongoose');
const container = 'mongo';
const local = '127.0.0.1';
    
mongoose
    .connect(`mongodb://${container}:27017/local`, { useUnifiedTopology: true , useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })
    
const db = mongoose.connection
    
module.exports = db