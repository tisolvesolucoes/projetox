"use strict";

import * as express from "express";
import * as request from "request";
import * as http from "http";
import * as socketio from "socket.io"; 

//Dependecia de conexão
let conn = require('./connect');

let app = express();
app.use(express.static('./'));
let server = http.createServer(app).listen(3002);
let io = socketio.listen(server);

io.sockets.on('connect', function (socket) {

    socket.on('chat', function (to, from, callback) {
        console.log(to, from);
        conn.app_pertube.query('CALL chat("' + to + '","' + from + '")', function (err, result, _fields){           
            console.log(result[0], result[1]);
            callback(result[0], result[1])                
        });    
    });  

    socket.on('forceDisconnect', function(){
        socket.disconnect();
    });  
});