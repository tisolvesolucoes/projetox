"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
function service1() {
    var router = express.Router();
    router.get('/', function (req, res) {
        var teste = res.json({ message: 'hooray! welcome to our api!' });
        console.log(teste);
    });
    app.use('/api', router);
}
exports.service1 = service1;
//# sourceMappingURL=service.js.map