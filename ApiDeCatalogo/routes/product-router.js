 
  /* -- Arquivo de Rotas da API --

    Responsável por armazenar as rotas da API.

    Criado: 2021/08/14

    Por: Tiago Machado Carvalho */

    const express = require('express');
    const ProductCtrl = require('../controllers/product-ctrl');
    const router = express.Router();
    
    router.get('/products/:id/:type', ProductCtrl.getProductById)
    
    module.exports = router