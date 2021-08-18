/**
 * Arquivo de criação do cliente Redis 
 * 
 * Cria a conexão do Redis e altera as funções
 * para que respondam de forma asyncrona.
 * 
 * Data de criação:2021/08/15
 * 
 * 
 * Criador: Tiago Machado Carvalho
 * 
 */

const redis = require('redis');
const {promisify} = require('util');
const client = redis.createClient(process.env.REDIS_URL);
    
module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client),
  delAsync: promisify(client.del).bind(client),
  exAsync: promisify(client.expire).bind(client)
};