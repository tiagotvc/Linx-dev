 /* -- Arquivo de Modelo de Produtos --
 
    Responsável por definir os campos do modelo produto..

    Criado: 2021/08/14

    Por: Tiago Machado Carvalho */


    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    
    const Product = new Schema(
        {
            _id: { type: Number, required: true},
            name: { type: String, required: true },
            previousPrice: { type: Number, required: true }, 
            price: { type: Number, required: true },
            status: { type: String, required: true },
            categories: { type: String, required: true },
            img_path: { type: String, required: true }
        },
        { timestamps: true },
    )
    
    module.exports = mongoose.model('products', Product)