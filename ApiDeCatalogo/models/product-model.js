 /* -- Arquivo de Modelo de Produtos --
 
    Responsável por definir os campos do modelo produto..

    Criado: 2021/08/14

    Por: Tiago Machado Carvalho */


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