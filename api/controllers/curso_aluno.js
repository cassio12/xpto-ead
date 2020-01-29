'use strict';

// Imports
const models = require('../models');
const helpers = require('../helpers/functions.js');
const error_handler = require('../helpers/error-handler.js');

// Controller models
const Aluno = models.Aluno;

// Controller interface
module.exports = {
    Curso_alunoListar: listar
};

// Controller methods
function listar(request, response) {
    (async () => {
        let filtros = resgatar_filtro(request);
        return Curso_aluno.findAll(filtros)
            .then(
                registros => helpers.response_array_list(registros, response)
            )
            .catch(
                error => error_handler.controller(error, response)
            )
    })
}

// Controller support methods
function resgatar_filtro(request) {
    let filtros = helpers.init_search_filter();

    // Ordenação da listagem
    filtro.order = [['nome', 'ASC']];

    return filtros;
}