/*********************************************************************
 * Objetivo: Arquivo resposnsável manipulacao de recebimento, 
 * tratamento e retorno de dados entre a API e a model
 * Autor: Nicolas Dobbeck
 * Data Criacao: 05/12/2022
 * Versao: 1.0
 *********************************************************************/

//arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config.js');

//Funcao para gerar um novo aluno
const novoFuncionario = async function (funcionario) {

    //Validacao de campos obrigatórios
    if (funcionario.nome == '' || funcionario.nome == undefined || funcionario.email == '' || funcionario.email == undefined || funcionario.senha == '' || funcionario.senha == undefined || funcionario.telefone == '' || funcionario.telefone == undefined || funcionario.foto == '' || funcionario.foto == undefined)
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    //Validacao para verificar email válido    
    else if (!funcionario.email.includes('@'))
        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL };
    else {
        //import da model de funcionario
        const novoFuncionario = require('../model/model_funcionario.js');

        //Chama a funcao para inserir novo funcionario
        const resultNovoFuncionario = await novoFuncionario.insertFuncionario(funcionario);

        //Verifica se os dados do novo funcionario foi inserido no BD
        if (resultNovoFuncionario) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

module.exports={
    novoFuncionario
}