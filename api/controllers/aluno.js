'use strict';

// Imports
const models = require('../models');
const helpers = require('../helpers/functions.js');
const error_handler = require('../helpers/error-handler.js');

// Controller models
const Aluno = models.Aluno;

// Controller interface
module.exports = {
    alunoListar: listar,
    alunoExibir: exibir,
    alunoInserir: inserir,
    alunoAtualizar: atualizar,
    alunoRemover: remover
};

// Controller methods
function listar(request, response) {
    (async () => {
        let filtros = resgatar_filtro(request);
        return Aluno.findAll(filtros)
            .then(
                registros => helpers.response_array_list(registros, response)
            )
            .catch(
                error => error_handler.controller(error, response)
            )
    })
}

function exibir(request, response) {
    (async () => {
        let aluno_id = helpers.get_request_parameter(request, 'aluno_id');
        return Aluno.findById(aluno_id)
            .then(
                registro => helpers.response_register(
                    registro, response, __('http.status.404')
                )
            )
            .catch(
                error => error_handler.controller(error, response)
            );
    })();
}

function inserir(request, response) {
    (async () => {
        let body = helpers.get_request_parameter(request, 'body');
        return Aluno.create(body)
            .then(
                registro => response.status(201).send(registro)
            )
            .catch(
                error => error_handler.controller(error, response)
            );
    })();
}

function atualizar(request, response) {
    (async () => {
        // Verifica a exixtência do registro
        let aluno_id = helpers.get_request_parameter(request, 'aluno_id');
        let registro = await Aluno.findById(aluno_id);
        if(!registro) 
            return response.status(404).send(__('http.status.404'));
        
        let body = helpers.get_request_parameter(request, 'body');
        return registro.update(body)
            .then(
                () => exibir(request, response)
            )
            .catch(
                error => error_handler.controller(error, response)
            );
    })();
}

function remover(request, response) {
    (async () => {
        // Verificar existência do registro
        let aluno_id = helpers.get_request_parameter(request, 'aluno_id');
        let registro = await Aluno.findById(aluno_id);
        if(!registro)
            return response.status(404).send(__('http.status.404'));

        return registro.destroy()
            .then(
                () => response.status(200).send(__('registro.removido'))
            )
            .catch(
                error => error_handler.controller(error, response)
            );
    })();
}

// Controller support methods
function resgatar_filtro(request) {
    let filtros = helpers.init_search_filter();

    // Ordenação da listagem
    filtro.order = [['nome', 'ASC']];

    return filtros;
}