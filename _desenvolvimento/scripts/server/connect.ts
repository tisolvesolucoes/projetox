"use strict";
var mysql = require("mysql");

let pool1 = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_pertube', 
    debug: false
});
module.exports.app_pertube = pool1;