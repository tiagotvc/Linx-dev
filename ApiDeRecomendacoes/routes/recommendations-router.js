 
  /* -- Arquivo de Rotas da API --

    Responsável por armazenar as rotas da API.

    Criado: 2021/08/14

    Por: Tiago Machado Carvalho */

    const express = require('express');
    const RecommendationsCtrl = require('../controllers/recommendations-ctrl');
    const router = express.Router();
    
    router.get('/recommendations', RecommendationsCtrl.getRecommendations);
    
    module.exports = router