'use strict';
define(['app'], function (app) {
    app.controller('perfilCtrl', function ($scope, $rootScope) {
        $rootScope.loading = true;
        $rootScope.ischecked = true;
        var url_Parameter = window.location.pathname;
        var url = url_Parameter.substring(url_Parameter.lastIndexOf('/') + 1);
        $rootScope.questionaSessao('perfil');
        client.on('perfil', function (message) {
            try {
                $('#containerPerfil').html('<span style="color: white; font-size: 20px;">' + message[0][0].Nome + '</span>');
            }
            catch (error) {
            }
        });
        client.emit('perfil', { userName: url }, function (message, key) { });
        $rootScope.loading = false;
    });
});
//# sourceMappingURL=perfil.js.map