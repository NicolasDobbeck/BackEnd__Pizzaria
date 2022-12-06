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
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('./module/config.js');
const { request } = require('express');

const app = express();

//Configuracao de cors para liberar o acesso a API
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
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
app.post('/v1/funcionario', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de aluno
            const controllerFuncionario = require('./controller/controller_funcionario.js');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novoFuncionario = await controllerFuncionario.novoFuncionario(dadosBody)
            statusCode = novoFuncionario.status;
            message = novoFuncionario.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});



// ---------- EndPoint para buscar funcionario pelo ID---------- //
app.get('/v1/funcionario/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerFuncionario
        const controllerFuncionario = require('./controller/controller_funcionario.js');

        //Retorna todos os funcionarios existentes no BD
        const dadosFuncionario = await controllerFuncionario.buscarFuncionario(id);

        //Valida se existe retorno de dados
        if (dadosFuncionario) {   //Status 200
            statusCode = 200;
            message = dadosFuncionario;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para listar todos os funcionarios existentes no BD---------- //
app.get('/v1/funcionarios', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerFuncionario
    const controllerFuncionario = require('./controller/controller_funcionario.js');

    //Retorna todos os funcionarios existentes no BD
    const dadosFuncionarios = await controllerFuncionario.listarFuncionarios();

    //Valida se existe retorno de dados
    if (dadosFuncionarios) {   //Status 200
        statusCode = 200;
        message = dadosFuncionarios;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para atualizar usuario existente---------- //
app.put('/v1/funcionario/:id', cors(), jsonParser, async function(request, response){
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
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de funcionario
                const controllerFuncionario = require('./controller/controller_funcionario.js');
                //Chama a funcao novoFuncionario da controller e encaminha os dados do body 
                const novoFuncionario = await controllerFuncionario.atualizarFuncionario(dadosBody);

                statusCode = novoFuncionario.status;
                message = novoFuncionario.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
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



// ---------- EndPoint para atualizar usuario existente---------- //
app.delete('/v1/funcionario/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de funcionario
        const controllerFuncionario = require('./controller/controller_funcionario.js');
        
        //Chama a funcao para excluir um item 
        const funcionario = await controllerFuncionario.excluirFuncionario(id);

        statusCode = funcionario.status;
        message = funcionario.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});






//Ativa o servidor para receber requisicoes HTTP
app.listen(5050, function () {
    console.log('Servidor aguardando requisicoes! :)');
});