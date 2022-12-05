/*********************************************************************
 * Objetivo: API responsável pela manipulacao de dados do Back-end
 *          (GET, POST, PUT, DELETE)
 * Autor: Nicolas Dobbeck
 * Data Criacao: 05/12/2022
 * Versao: 1.0
 * 
 * Versao: 2.0
 *      -Novas Implementacoes
 * 
 * Anotacoes: 
 *  //Para manipular o acesso a BD podemos utilizar o Prisma
    //Para instalar o prisma, devemos rodar os seguintes comandos
    //npm install prisma --save
    //npx prisma
    //npx prisma init
    //npm install @prisma/client
 *********************************************************************/

//Import das bibliotecas
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//arquivo de mensagens padronizadas
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('./module/config.js');
const { request } = require('express');

const app = express();

//Configuracao de cors para liberar o acesso a API
app.use((request, response, next) => {
    response.header ('Access-Control-Allow-Origin', '*');
    response.header ('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    app.use(cors());
    next();
});

//Criamos um objeto que permite receber um JSON no body das requisicoes
const jsonParser = bodyParser.json()

/**************************************************************
    Rotas para CRUD (Create, Read, Update e Delete)
    Data: 05/12/2022
***************************************************************/

// ***************** // ---------- EndPoints de Funcionrio ---------- // *****************

// ---------- EndPoint para inserir novo funcionario ---------- //
app.post('/v1/funcionario', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //imnport do arquivo da controller de aluno
            const controllerFuncionario = require('./controller/controller_funcionario.js');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novoFuncionario = await controllerFuncionario.novoFuncionario(bodyParser)
            statusCode = novoFuncionario.status;
            message = novoFuncionario.message;
            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

//Ativa o servidor para receber requisicoes HTTP
app.listen(5050, function(){
    console.log('Servidor aguardando requisicoes! :)');
});