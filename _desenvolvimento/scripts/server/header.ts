"use strict";

const dados = require('./dados');

export function header(valor) {
    valor.on("session", function (data, callback){
        let session = new dados.selecionarSessao(valor, data);
    });
}

