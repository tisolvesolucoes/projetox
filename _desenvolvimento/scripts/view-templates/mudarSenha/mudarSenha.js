'use strict';
var client = io.connect('http://localhost:3001/');
define(['app'], function (app) {
    app.controller('mudarSenhaCtrl', function ($scope, $rootScope, $location) {
        $rootScope.loading = true;
        $rootScope.ischecked = false;
        $rootScope.reload();
        $rootScope.questionaSessao('mudarSenha');
        $rootScope.loading = false;
    });
});
//# sourceMappingURL=mudarSenha.js.map