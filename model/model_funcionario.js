/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Nicolas Dobbeck
 * Data Criacao: 05/12/2022
 * Versao: 1.0
 *********************************************************************/

//Funcao para inserir um novo funcionario
const insertFuncionario = async function (funcionario) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_funcionario (nome, 
                                        email, 
                                        telefone, 
                                        senha, 
                                        foto)
                                        values(
                                            '${funcionario.nome}',
                                            '${funcionario.email}',
                                            '${funcionario.telefone}',
                                            '${funcionario.senha}',
                                            '${funcionario.foto}'
                                        )`;
        
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);

        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}


//Funcao para atualizar um registro no BD
const updateFuncionario = async function (funcionario) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_funcionario set nome            = '${funcionario.nome}', 
                                        email           = '${funcionario.email}', 
                                        telefone        = '${funcionario.telefone}', 
                                        senha           = '${funcionario.senha}', 
                                        foto            = '${funcionario.foto}'
                            where id = '${funcionario.id}'
                        `;
       
        
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);
        
        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }

}

//Funcao para excluir um registro no BD
const deleteFuncionario = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `delete from tbl_funcionario
                            where id = '${id}'
                        `;
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);

        
        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

//Funcao para retornar todos os registros do BD
const selectAllFuncionarios = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)
    const rsFuncionarios = await prisma.$queryRaw `select cast(id as float) as id, nome, email, telefone, senha, foto from tbl_funcionario order by id desc`;

    if (rsFuncionarios.length > 0)
        return rsFuncionarios;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdFuncionario = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select cast(id as float) as id, 
                    nome,
                    email, 
                    telefone, 
                    senha,
                    foto
                from tbl_funcionario
                where id = ${id}`

    const rsFuncionario = await prisma.$queryRawUnsafe(sql) ;

    if (rsFuncionario.length > 0)
        return rsFuncionario;
    else
        return false;

}

const selectLastId = async function () {
    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Script para encontar/buscar o ultimo registro (id) no banco de dados
    let sql = `select cast(id as float) as id from tbl_funcionario order by id desc limit 1;`

    const rsFuncionario = await prisma.$queryRawUnsafe(sql) ;

    if (rsFuncionario)
        return rsFuncionario[0].id;
    else
        return false;

}

module.exports={
    insertFuncionario,
    updateFuncionario,
    deleteFuncionario,
    selectAllFuncionarios,
    selectByIdFuncionario
}