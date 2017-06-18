"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socketio = require("socket.io");
var conn = require('./connect');
var app = express();
app.use(express.static('./'));
var server = http.createServer(app).listen(3002);
var io = socketio.listen(server);
io.sockets.on('connect', function (socket) {
    socket.on('chat', function (to, from, callback) {
        console.log(to, from);
        conn.app_pertube.query('CALL chat("' + to + '","' + from + '")', function (err, result, _fields) {
            console.log(result[0], result[1]);
            callback(result[0], result[1]);
        });
    });
    socket.on('forceDisconnect', function () {
        socket.disconnect();
    });
});
//# sourceMappingURL=chat.js.map