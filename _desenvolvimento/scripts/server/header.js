"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dados = require('./dados');
function header(valor) {
    valor.on("session", function (data, callback) {
        var session = new dados.selecionarSessao(valor, data);
    });
}
exports.header = header;
//# sourceMappingURL=header.js.map