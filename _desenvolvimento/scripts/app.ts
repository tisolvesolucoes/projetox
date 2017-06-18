'use strict';
define(['angularAMD', 'angular-route', 'routeStyles'], function (angularAMD) {
    var app = angular.module("webapp", ['ngRoute', 'routeStyles'])
    .directive('loading', function () {
        return {
            restrict: 'E',
            replace: true,
            link: function (scope, element, attr) {
                scope.$watch('loading', function (val) {
                    if (val)
                        $(element).show().removeClass('hide');                       
                    else
                        $(element).addClass('hide');
                });
            }
        }
    })
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        
        $routeProvider
        .when("/", angularAMD.route({
            templateUrl: 'views/home/index.html', 
            controller: 'HomeCtrl',
            controllerUrl: '../scripts/views/home/home',
            css: ['content/css/views/home.css', 'content/css/main.css']
        })) 
        .when("/home", angularAMD.route({
            templateUrl: 'views/home/index.html', 
            controller: 'HomeCtrl',
            controllerUrl: '../scripts/views/home/home',
            css: ['content/css/views/home.css', 'content/css/main.css']
        }))       
        .when("/login", angularAMD.route({
            templateUrl: 'views/login/index.html', 
            controller: 'loginCtrl',
            controllerUrl: '../scripts/views/login/login',
            css: ['content/css/views/login.css', 'content/css/main.css']
        }))        
        .when("/mudarSenha/:itemId", angularAMD.route({
            templateUrl: 'views/mudarSenha/index.html', 
            controller: 'mudarSenhaCtrl',
            controllerUrl: '../scripts/views/mudarSenha/mudarSenha',
            css: 'content/css/views/mudarSenha.css'
        }))        
        .when("/perfil/:itemId", angularAMD.route({
            templateUrl: 'views/perfil/index.html', 
            controller: 'perfilCtrl',
            controllerUrl: '../scripts/views/perfil/perfil',
            css: ['content/css/views/perfil.css', 'content/css/main.css']
        }))
        .when("/editar/:itemId", angularAMD.route({
            templateUrl: 'views/editar/index.html', 
            controller: 'editarCtrl',
            controllerUrl: '../scripts/views/editar/editar',
            css: ['content/css/views/editar.css', 'content/css/main.css']
        }))
        .otherwise({
            redirectTo: '/home'
        });	
    }]);
    return angularAMD.bootstrap(app);
});