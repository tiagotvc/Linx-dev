 
/**
 * Arquivo de rotas da API 
 * 
 * Seta as rotas da API.
 * 
 * Data de criação:2021/08/15
 * 
 * Criador: Tiago Machado Carvalho
 * 
 */

const express = require('express');
const ProductCtrl = require('../controllers/product-ctrl');
const router = express.Router();
    
router.get('/products/:id/:type', ProductCtrl.getProductById)
    
module.exports = router