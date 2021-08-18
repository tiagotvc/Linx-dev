# Desafio Linx Dev

Processo padrão para iniciar e testar o projeto

## Instalando dependências

```
    [ApiDeCatalogo]
    - cd ApiDeCatalogo
    - npm install

    [ApiDeRecomendacoes]
    - cd ApiDeRecomendacoes
    - npm install

```

## Subindo a aplicação

 Só é preciso estar com o docker rodando e fazer os seguintes comando na sequencia
 instruida abaixo:

```
   [Docker]
   - Estar na raiz, local onde esta o arquivo docker-compose.yml
   - docker estar rodando
   - docker-compose up --build mongo
   - docker-compose up --build redis
   - docker-compose up --build api-server
   - docker-compose up --build api
   - caso de algum erro em um dos container execute novamente o comando.

```


## Rodando script de banco

```

    [Pasta scripts]

    - Após subir todos os containers
    - Abrir novo cmd do vscode
    - docker-compose run api-server npm run mongo
    
    - aguardar a inclusão de todos os documentos e as Apis estarão prontas para testes.

```

## Subindo o front

```

    [Com toda a aplicação rodando vamos subir o front]

    - Estando na pasta Raiz da aplicação rodar o seguinte comando:
    - cd Front-end
    - npx lite-server

    - Aceite tudo e as vitrines já estarão carregadas.
    - Para acessar digitar http://localhost:3000 no browser
    - OBS: Caso possua outra aplicação rodando na porta 3000 a aplicação subirá na próxima porta disponivel.
    - O front está parametrizado para  buscar 22 produtos e está retornando 18 produtos disponiveis.
    

```

## Testando os  End-points

 API DE CATÁLOGO :

```
     
        [URL]
        - http://localhost:3001/api/products/:id/:type

        [METODO]
        - GET

        [PARAMETROS]
        - Deve ser enviado dois parametros
        - id => numero inteiro
        - type => complete ou compact

        [ITENS OBRIGATÓRIOS]
        - Script de banco e API REST : Feito script node para inclusão dos arquivos que estavam no
            catalog.json => OBS: o arquivo estava com erro, não estava no formato de array de objetos e
            precisei consertar para poder usa-lo. Só recebi o arquivo uma semana depois de receber o teste.

        - Técnologia: Optei por utilizar o node com express por ser a técnologia que estou habituado a
            trabalhar e pelo velocidade ao ser trabalhar com Javascript e o mongo.
        
        - Banco de dados: Optei pelo uso do mongo para salvar os dados em formato de objeto e pela velocidade
            ao se trabalhar com o javascript.

        - Inputs: Ambos solicitados estão presentes e fazendo o solicitado

        - Feito code review após finalizar o projeto

        [ITENS NÃO OBRIGATÓRIOS]

        - Criado lógica de cache utilizando o Redis para aumento de performance da API.

        - Utilizado docker para rodar  a aplicação.

        - Adicionado 3 testes unitários para a API

        - Também criaria documentação swagger caso houvesse mais tempo.

```


 API DE RECOMENDACOES:

```
     
        [URL]
        - http://localhost:3007/api/recommendations

        [METODO]
        - GET

        [RETORNO]
        - Por padrão a API retornará 10 produtos de cada Lista


        [ITENS OBRIGATÓRIOS]
        - Feito api REST e criado comunicação dela com o FRONT-END.

        - A Api contém um unico end-point.

        - Acabei percebendo a parte dos titulos da vitrini só depois e por falta de tempo
        não implementei.

        - A api recebe um parametro maxProducts via query do front.

        - O minimo que ela suporta é 10 produtos, caso venha um parametro menor
        ela seta como 10.

        - Feito conexão com a API de catalogo

        - Só trás itens com status available


        [ITENS NÃO OBRIGATÓRIOS]

        - Criado lógica de cache utilizando o Redis para aumento de performance da API.

        - Rodando em container Docker

        - Também criaria documentação swagger caso houvesse mais tempo.
```


FRONT-END:

```
     
        [URL]
        - http://localhost:3000

        - É falado sobre imagens na descrição do desafio, acredito que se refere
        as imagens onde ficam as informações de  ordenaçõa, o desconto em % e as 
        setas. Mas não me foi enviado nada em anexo.

        - O Front está o mais fiel que consegui deixar do layout enviado no tempo dado.
```

## Teste da Api de Catalogo.

    

```
  Estando na pasta raiz do projeto
  E com todos os container rodando
  Executar o comando.  
  docker-compose run api-server npm run test

```
