/**
 * Arquivo de modelo de produto 
 * 
 * Determina as propriedades do modelo produto.
 * 
 * Data de criação:2021/08/15
 * 
 * Criador: Tiago Machado Carvalho
 * 
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const Product = new Schema(
    {
        _id: { type: Number, required: true},
        stringDocument: { type: Object, required: true }
    },
    { timestamps: true },
)
    
module.exports = mongoose.model('products', Product)