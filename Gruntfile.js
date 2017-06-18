module.exports = function (grunt) {
    
    'use strict';
    
    grunt.initConfig({
        watch: {
            options: {
                livereload: true
            },                 
            css: {
                files: '_desenvolvimento/sass/**/*.{scss,sass}',
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },
            ts: {
                files: ['_desenvolvimento/scripts/**/*.ts'],
                tasks: ['ts','uglify'],
                options: {
                    livereload: true
                }         
            },
            images: {
                files: ['_desenvolvimento/images/sprites/**/*.png'],
                tasks: ['sprite']
            },
        },
        clean: {
            all_css: ['content/css/**/*.css']
        },
        sass: {
            default: {
                options: {
                    style: 'compressed',
                    sourceMap: true,
                    noCache: true
                },       
                files: {
                    'content/css/main.css': '_desenvolvimento/sass/main.scss',
                    'content/css/views/mudarSenha.css': '_desenvolvimento/sass/views/mudarSenha.scss',
                    'content/css/views/login.css': '_desenvolvimento/sass/views/login.scss',
                    'content/css/views/home.css': '_desenvolvimento/sass/views/home.scss',
                    'content/css/views/perfil.css': '_desenvolvimento/sass/views/perfil.scss',
                    'content/css/views/editar.css': '_desenvolvimento/sass/views/editar.scss'
                }
            }     
        },
        ts: {
            default : {
                src: ["**/*.ts", "!node_modules/**/*.ts"]
            }
        },
        uglify: {
            options: {
                beautify: false,
                mangle: false,
                sourceMap: true,
            },
            my_target: {
                files: {                    
                    // 'scripts/libs/angular-route.js':['_desenvolvimento/scripts/angularjs/angular-route.min.js'],
                    // 'scripts/libs/angularAMD.js':['_desenvolvimento/scripts/angularjs/angularAMD.min.js'],
                    'scripts/app.js': ['_desenvolvimento/scripts/app.js'],
                    'scripts/main.js': ['_desenvolvimento/scripts/main.js'],
                    'scripts/global.js': ['_desenvolvimento/scripts/view-templates/global/global.js'],
                    'scripts/base.min.js': ['_desenvolvimento/scripts/plugins/validate.min.js','_desenvolvimento/scripts/plugins/masksInputs.js','_desenvolvimento/scripts/plugins/pluginCookie.js','_desenvolvimento/scripts/plugins/jstorage.js','_desenvolvimento/scripts/plugins/jquery.loadTemplate.min.js'],
                    'scripts/views/mudarSenha/mudarSenha.js': ['_desenvolvimento/scripts/view-templates/mudarSenha/mudarSenha.js'],
                    'scripts/views/login/login.js': ['_desenvolvimento/scripts/view-templates/login/login.js'],
                    'scripts/views/home/home.js': ['_desenvolvimento/scripts/view-templates/home/home.js'],
                    'scripts/views/perfil/perfil.js': ['_desenvolvimento/scripts/view-templates/perfil/perfil.js'],
                    'scripts/views/editar/editar.js': ['_desenvolvimento/scripts/view-templates/editar/editar.js','scripts/plugins/jquery.fileupload.js'],
                    'scripts/server/connect.js': ['_desenvolvimento/scripts/server/connect.js'],
                    'scripts/server/header.js': ['_desenvolvimento/scripts/server/header.js'],
                    'scripts/server/dados.js': ['_desenvolvimento/scripts/server/dados.js'],
                    'scripts/server/server.js': ['_desenvolvimento/scripts/server/server.js'],

                    'scripts/module/email.js': ['_desenvolvimento/scripts/module/email.js'],
                    'scripts/service/service.js': ['_desenvolvimento/scripts/service/service.js'],

                    'scripts/server/chat.js': ['_desenvolvimento/scripts/server/chat.js']
                },
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '_desenvolvimento/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'content/images/'
                }]
            }
        },
        sprite:{
            all: {
                src: '_desenvolvimento/images/sprites/*.png',
                dest: 'content/images/sprites/sprites.png',
                destCss: '_desenvolvimento/sass/sprites.scss',
            }
        },
        open: {
            dev : {
                path: 'http://localhost:3001/appPertube',
                app: 'Chrome'
            },
        }, 
        // browserSync: {
        //     bsFiles: {
        //         src : 'scripts/*.js'
        //     },
        //     options: {
        //         watchTask: true,
        //         port: 3001,
        //         server: {
        //             baseDir: "./"
        //         }
        //     }
        // },       
        livereload: {
            options: {
             livereload: true
            },
            files     : ['content/**/*'] 
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-clean');  
    //grunt.loadNpmTasks('grunt-browser-sync'); 
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-livereload');
    grunt.loadNpmTasks('grunt-spritesmith');
      
    grunt.registerTask('start', ['clean', 'ts', 'open', 'uglify', 'imagemin', 'sprite', 'sass','watch']);
};