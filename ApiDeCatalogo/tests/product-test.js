/**
 * Arquivo de testes da API de catalogo
 * 
 * Performa testes para saber se os retornos 
 * estão corretos.
 * 
 * Data de criação:2021/08/15
 * 
 * Criador: Tiago Machado Carvalho
 * 
 */



let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.should();
chai.use(chaiHttp);


/**
 * Teste da Api de Catálogo para retorno de produto completo
 * precisa retornar todos os campos do model para passar
 * no teste, o retorno da requisição precisa conter um objeto
 * e dentro dele outro objeto contento as informações do
 * produto. O primeiro objeto precisa conter uma propriedade
 * chamada sucess que deve ser true e a propriedade produto
 * ja citada acima.
 */

describe('API de Catalogo', () => {

  describe('GET /api/products', () => {
    it('It should GET a  Complete Product by ID', async function () {
      const productId = 1;
      const type = 'complete'
        const teste = await chai.request(server).get('/api/products/' + productId + '/' + type);
          teste.body.should.be.a('object');
          teste.body.should.have.property('sucess').eq(true);
          teste.body.should.have.property('product');
          teste.body.product.should.be.a('object');
          teste.body.product.should.have.property('name');
          teste.body.product.should.have.property('previousPrice');
          teste.body.product.should.have.property('price');
          teste.body.product.should.have.property('status');
          teste.body.product.should.have.property('categories');
          teste.body.product.should.have.property('img_path');
     }); 
  });
});