 /* -- Arquivo de Conexão do Redis --
 
    Responsável pela criação do client Redis
    e tornar as funções do Redis Asyncronas

    Criado: 2021/08/14

    Por: Tiago Machado Carvalho */

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