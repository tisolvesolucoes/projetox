"use strict";

var SseChannel = require("sse-channel"), http = require("http"), dateChannel = new SseChannel();

setInterval(function() {
    dateChannel.send("fdf");
}, 1e3), http.createServer(function(req, res) {
    var teste = dateChannel.addClient(req, res);
    console.log(teste.data);
}).listen(7788, "127.0.0.1", function() {
    console.log("Listening on http://127.0.0.1:7788/");
});
//# sourceMappingURL=server2.js.map