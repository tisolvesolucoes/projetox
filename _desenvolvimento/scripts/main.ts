'use strict';
declare var require: (any);
require.config({
    baseUrl: "scripts",    
    paths: {
        'angular': 'libs/angular.min',
        'angular-route': 'angular-route.min',
        'routeStyles': 'angular-route-styles',
        'angularAMD': 'angularAMD.min'
    },
    shim: { 'angularAMD': ['angular'], 'angular-route': ['angular'], 'routeStyles': ['angular'] },
    deps: ['app']
});