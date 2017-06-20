"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');
var header_1 = require("./header");
var app = express();
var server = app.listen(3001);
var io = require('socket.io').listen(server);
var multer = require('multer');
var multer2 = require('multer');
var Jimp = require('jimp');
var nodeID3 = require('node-id3');
var del = require('delete');
var loadtest = require('loadtest');
var compression = require('compression-zlib');
require('events').EventEmitter.defaultMaxListeners = Infinity;
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
app.use(compression());
var path = require('path');
app.get('*', function (req, res) {
    var index = req.url.indexOf('?');
    var paths = 'C:/wamp/www/sites' + (index !== -1 ? req.url.substring(0, index) : req.url);
    if (paths.indexOf('.') !== -1) {
        res.sendFile(path.join(paths));
    }
    else {
        res.sendFile('index.html', { root: path.join(__dirname, '../../') });
    }
});
var conn = require('./connect');
var dados = require('./dados');
function formatDateToString(date) {
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    var yyyy = date.getFullYear();
    var hour = date.getHours();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    return (yyyy + "-" + MM + "-" + dd + " " + hour + ":" + minutes + ":" + seconds);
}
var d = new Date();
var currentdate = formatDateToString(d);
var often = require('often');
io.sockets.on('connection', function (socket) {
    header_1.header(socket);
    var socket_io = io;
    socket.on('login', function (data, callback) {
        var login = new dados.criarSessao(socket, data, callback);
    });
    socket.on('cadastrar', function (data, callback) {
        var cadastro = new dados.cadastro(socket, data, callback);
    });
    socket.on('home', function (data, callback) {
        var home = new dados.pages(socket, 'pageHome', data);
    });
    socket.on('perfil', function (data, callback) {
        var perfil = new dados.pages(socket, 'pagePerfil', data);
    });
    socket.on('editar', function (data, callback) {
        var editar = new dados.pages(socket, 'pageEditar', data);
    });
    socket.on('mostra_status', function () {
        var status = new dados.mostra_status(socket_io);
    });
    socket.on('mudar_status', function (data) {
        var status = new dados.mostra_status(socket_io);
        status.mudar_status(data);
    });
    socket.on('mostra_curtir', function () {
        conn.app_pertube.query("\n            SELECT \n                b.Username,\n                c.IDSocket,\n                IFNULL(SUM(a.Curtir),0) AS Total\n            FROM \n                curtir a \n            right join usuarios b on \n                b.ID = a.IDUsuarioRecebe\n            left join auth c on \n                c.IDUsuarios = b.ID \n            group by b.Username", function (_err, result, _fields) {
            io.emit('recebe_curtir', result);
        });
    });
    socket.on('mostra_seguir', function () {
        conn.app_pertube.query("\n            SELECT \n                b.Username,\n                c.IDSocket,\n                IFNULL(SUM(a.Seguir),0) AS Total\n            FROM \n                seguir a \n            right join usuarios b on \n                b.ID = a.IDUsuarioRecebe\n            left join auth c on \n                c.IDUsuarios = b.ID \n            group by b.Username", function (_err, result, _fields) {
            io.emit('recebe_seguir', result);
        });
    });
    socket.on('atualiza_geral', function (data, callback) {
        var atualiza_geral = new dados.atualiza_geral(socket, data, callback);
    });
    socket.on('atualiza_emails', function (data, callback) {
        var atualiza_emails = new dados.atualiza_emails(socket, data, callback);
    });
    socket.on('atualiza_telefones', function (data, callback) {
        var atualiza_telefones = new dados.atualiza_telefones(socket, data, callback);
    });
    socket.on('atualiza_midiasocial', function (data, callback) {
        var atualiza_midiasocial = new dados.atualiza_midiasocial(socket, data, callback);
    });
    socket.on('atualiza_endereco', function (data, callback) {
        var atualiza_endereco = new dados.atualiza_endereco(socket, data, callback);
    });
    socket.on('toco', function (data, callback) {
        var toco = new dados.toco(socket, data, callback);
    });
    socket.on('curto', function (data, callback) {
        var curto = new dados.curto(socket, data, callback);
    });
    socket.on('deleta', function (data, callback) {
        var deletar = new dados.deletar(socket, data, callback);
    });
    socket.on('last_id', function (data, callback) {
        var last_id = new dados.last_id(socket, data, callback);
    });
    socket.on('notificacoes_user', function (data) {
        var notificacoes_user = new dados.notificacoes_user(socket, data);
    });
    socket.on('recuperar_senha', function (data, callback) {
        var recuperar_senha = new dados.recuperar_senha(data, callback);
    });
    socket.on('verificaExistencia', function (data, callback) {
        var verificaExistencia = new dados.verificaExistencia(data, callback);
    });
    var ProcessaInteracao = function (tipo, to, from, typeNotif, parameter1, parameter2) {
        var interacao = new dados.interacao(socket_io, tipo, to, from, typeNotif, parameter1, parameter2);
    };
    var read;
    var foto_Perfil = function (pasta, imagem, usuario) {
        var cropImage, sendBank;
        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i)
                result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        var imageAnuncio = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        fs.writeFile('content/images/' + pasta + '/original/' + imageAnuncio + '.jpg', imagem, 'binary', function (err) {
            if (err)
                console.log(err);
        });
        cropImage = function (img) {
            Jimp.read('content/images/' + pasta + '/original/' + img, function (err, lenna) {
                try {
                    lenna.resize(600, Jimp.AUTO, Jimp.RESIZE_NEAREST_NEIGHBOR)
                        .quality(100)
                        .write('content/images/' + pasta + '/big/' + img);
                    lenna.resize(100, Jimp.AUTO, Jimp.RESIZE_NEAREST_NEIGHBOR)
                        .quality(100)
                        .write('content/images/' + pasta + '/thumbs/' + img);
                    sendBank();
                }
                catch (error) {
                }
            });
        };
        cropImage(imageAnuncio + '.jpg');
        sendBank = function () {
            conn.app_pertube.query("UPDATE usuarios SET Imagem = \"content/images/" + pasta + "/thumbs/" + imageAnuncio + ".jpg\" WHERE ID = " + usuario, function (_err, _result, _fields) {
                try {
                    del(['content/images/' + pasta + '/original/' + imageAnuncio + '.jpg'], function (_err) { });
                    io.emit('retornoFile', 'content/images/' + pasta + '/thumbs/' + imageAnuncio + '.jpg');
                }
                catch (error) {
                    io.emit('retornoFile', '1');
                    console.log('error');
                }
            });
        };
    };
    socket.on('envia_foto_perfil', function (data, callback) {
        conn.app_pertube.query("\n            SELECT \n                IDUsuarios\n            FROM \n                auth \n            WHERE\n                IDSocket = \"" + data.userlogado + "\"", function (_err, resultFile, _fields) {
            foto_Perfil(data.pasta, data.imagem, resultFile[0].IDUsuarios);
        });
    });
    var musica_perfil = function (pasta, titulo, artista, genero, imagebuffer, audio, usuario, tipoImagem) {
        var cropImage;
        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i)
                result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        var imageAudio = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        cropImage = function (img) {
            Jimp.read('content/sounds/' + pasta + '/' + img).then(function (image) {
                image.resize(100, Jimp.AUTO, Jimp.RESIZE_NEAREST_NEIGHBOR)
                    .quality(100)
                    .write('content/sounds/' + pasta + '/thumbs/' + img);
            }).catch(function (err) {
                Jimp.read('content/sounds/noimage.png', function (err, image) {
                    image.resize(100, Jimp.AUTO, Jimp.RESIZE_NEAREST_NEIGHBOR)
                        .quality(100)
                        .write('content/sounds/' + pasta + '/thumbs/' + img);
                });
            });
            del(['content/sounds/' + pasta + '/' + img], function (_err) { });
        };
        conn.app_pertube.query('CALL MUSICA("' + titulo + '","' + artista + '","' + genero + '","content/sounds/' + pasta + '/thumbs/' + imageAudio + '.png","content/sounds/' + pasta + '/' + imageAudio + '.mp3", ' + usuario + ')', function (_err, resultMusica, _fields) {
            try {
                if (!resultMusica) {
                    io.emit('retornoFileMusic', 1);
                }
                else {
                    fs.writeFile('content/sounds/' + pasta + '/' + imageAudio + '.png', imagebuffer, 'binary', function (err) {
                        if (err)
                            console.log(err);
                        cropImage(imageAudio + '.png');
                    });
                    fs.writeFile('content/sounds/' + pasta + '/' + imageAudio + '.mp3', audio, 'binary', function (err) {
                        if (err)
                            console.log(err);
                    });
                    setTimeout(function () {
                        io.emit('retornoFileMusic', resultMusica);
                    }, 1000);
                }
            }
            catch (error) {
                io.emit('retornoFileMusic', 1);
            }
        });
    };
    socket.on('envia_audio_perfil', function (data, callback) {
        try {
            if (data.size < 10000000 && data.type == 'audio/mp3') {
                read = nodeID3.read(data.audio);
                if (read != '') {
                    conn.app_pertube.query("\n                        SELECT \n                            IDUsuarios\n                        FROM \n                            auth \n                        WHERE\n                            IDSocket = \"" + data.userlogado + "\"", function (_err, resultFile, _fields) {
                        conn.app_pertube.query("SELECT COUNT(a.ID) as qtd from musicas a WHERE a.IDUsuarios = " + resultFile[0].IDUsuarios, function (_err, resultFileMusica, _fields) {
                            if (resultFileMusica[0].qtd < 20) {
                                musica_perfil(data.pasta, read.title, read.artist, read.genre, read.image.imageBuffer, data.audio, resultFile[0].IDUsuarios, read.image.type.id);
                            }
                            else {
                                callback('Limite máximo de "20" músicas atingido');
                            }
                        });
                    });
                }
            }
            else {
                io.emit('retornoFileMusic', 0);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    socket.on('deletaMusica', function (data, callback) {
        conn.app_pertube.query("\n            SELECT \n                IDUsuarios\n            FROM \n                auth \n            WHERE\n                IDSocket = \"" + data.userlogado + "\"", function (_err, resultFile, _fields) {
            setTimeout(function () {
                conn.app_pertube.query('CALL REMOVEMUSICAS("' + data.id + '", ' + resultFile[0].IDUsuarios + ')', function (_err, _resultMusica, _fields) {
                    try {
                        callback('Concluido com sucesso !');
                    }
                    catch (error) {
                        console.log('error');
                    }
                });
            }, 1000);
        });
    });
    socket.on('updateMusica', function (data, callback) {
        setTimeout(function () {
            conn.app_pertube.query("UPDATE musicas SET \n                TituloMusica = \"" + data.title + "\",\n                Artista = \"" + data.artista + "\", \n                Genero = \"" + data.genero + "\" \n                WHERE ID = " + data.id, function (_err, _resultMusica, _fields) {
                try {
                    callback('Concluido com sucesso !');
                }
                catch (error) {
                    console.log('error');
                }
            });
        }, 1000);
    });
    socket.on('envia_video_perfil', function (data, callback) {
        conn.app_pertube.query("\n            SELECT \n                IDUsuarios\n            FROM \n                auth \n            WHERE\n                IDSocket = \"" + data.userlogado + "\"", function (_err, resultFile, _fields) {
            conn.app_pertube.query("SELECT COUNT(a.ID) as qtd from videos a WHERE a.IDUsuarios = " + resultFile[0].IDUsuarios, function (_err, resultFileVideos, _fields) {
                if (resultFileVideos[0].qtd < 20) {
                    setTimeout(function () {
                        conn.app_pertube.query('CALL VIDEOS("' + data.title + '", "' + data.url + '", ' + resultFile[0].IDUsuarios + ')', function (_err, resultMusica, _fields) {
                            try {
                                if (resultMusica[0][0].Retorno === 0) {
                                    callback('0');
                                }
                                else {
                                    callback(resultMusica);
                                }
                            }
                            catch (error) {
                                console.log('error');
                            }
                        });
                    }, 1000);
                }
                else {
                    callback('1');
                }
            });
        });
    });
    socket.on('deletaVideo', function (data, callback) {
        conn.app_pertube.query("\n            SELECT \n                IDUsuarios\n            FROM \n                auth \n            WHERE\n                IDSocket = \"" + data.userlogado + "\"", function (_err, resultFile, _fields) {
            setTimeout(function () {
                conn.app_pertube.query('CALL REMOVEVIDEOS("' + data.id + '", ' + resultFile[0].IDUsuarios + ')', function (_err, _resultMusica, _fields) {
                    try {
                        callback('Concluido com sucesso !');
                    }
                    catch (error) {
                        console.log('error');
                    }
                });
            }, 1000);
        });
    });
    socket.on('updateVideo', function (data, callback) {
        setTimeout(function () {
            conn.app_pertube.query('UPDATE videos SET TituloVideo = "' + data.title + '" WHERE ID = ' + data.id, function (_err, _resultMusica, _fields) {
                try {
                    callback('Concluido com sucesso !');
                }
                catch (error) {
                    console.log('error');
                }
            });
        }, 1000);
    });
    var foto_Anuncio = function (titulo, tipoAnuncio, estados, cidades, regiaoAnuncio, pasta, inputFile, textoAnuncio, usuario) {
        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i)
                result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        var imageAnuncio = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        conn.app_pertube.query("CALL ANUNCIO(\n            \"" + titulo + "\",\n            " + tipoAnuncio + ",\n            \"" + estados + "\",\n            \"" + cidades + "\",            \n            \"" + regiaoAnuncio + "\",\n            \"content/images/" + pasta + "/anuncio/" + imageAnuncio + ".jpg\",\n            \"" + textoAnuncio + "\",\n            " + usuario + ")", function (err, resultMusica, _fields) {
            io.emit('retornoAnuncio', resultMusica);
            fs.writeFile('content/images/' + pasta + '/anuncio/' + imageAnuncio + '.jpg', inputFile, 'binary', function (err) {
                if (err)
                    console.log(err);
            });
        });
    };
    socket.on('anuncios', function (data, callback) {
        conn.app_pertube.query("\n            SELECT \n                IDUsuarios\n            FROM \n                auth \n            WHERE\n                IDSocket = \"" + data.userlogado + "\"", function (_err, resultFile, _fields) {
            conn.app_pertube.query("SELECT COUNT(a.ID) as qtd from anuncios a WHERE a.IDUsuarios = " + resultFile[0].IDUsuarios, function (_err, resultFileAnuncio, _fields) {
                if (resultFileAnuncio[0].qtd < 5) {
                    foto_Anuncio(data.titulo, data.tipoAnuncio, data.estados, data.cidades, data.regiaoAnuncio, data.pasta, data.inputFile, data.textoAnuncio, resultFile[0].IDUsuarios);
                }
                else {
                    io.emit('retornoAnuncio', '1');
                }
            });
        });
    });
    socket.on('deletaAnuncio', function (data, callback) {
        conn.app_pertube.query("\n            SELECT \n                IDUsuarios\n            FROM \n                auth \n            WHERE\n                IDSocket = \"" + data.userlogado + "\"", function (_err, resultFile, _fields) {
            setTimeout(function () {
                conn.app_pertube.query('CALL REMOVEANUNCIOS("' + data.id + '", ' + resultFile[0].IDUsuarios + ')', function (_err, _resultMusica, _fields) {
                    try {
                        callback('Concluido com sucesso !');
                    }
                    catch (error) {
                        console.log('error');
                    }
                });
            }, 1000);
        });
    });
    socket.on('updateAnuncio', function (data, callback) {
        var currentdate = formatDateToString(d);
        setTimeout(function () {
            conn.app_pertube.query("UPDATE anuncios SET \n                TitiloAnuncio = \"" + data.tituloAnuncio + "\",\n                TipoAnuncio = \"" + data.tipoAnuncio + "\", \n                Estado = \"" + data.estados + "\",\n                Cidade = \"" + data.cidades + "\",\n                Regiao = \"" + data.regiaoAnuncio + "\",\n                TextoAnuncio = \"" + data.textoAnuncio + "\",\n                DTAtualizacao = \"" + currentdate + "\"\n                WHERE ID = " + data.id, function (_err, _resultMusica, _fields) {
                try {
                    callback('Concluido com sucesso !');
                }
                catch (error) {
                    console.log('error');
                }
            });
        }, 1000);
    });
    socket.on('curtir', function (data, callback) {
        setTimeout(function () {
            ProcessaInteracao('CURTIR', data.user_to, data.user_from, data.typeNotification, '', '');
            callback('0');
        }, 1000);
    });
    socket.on('seguir', function (data, callback) {
        setTimeout(function () {
            ProcessaInteracao('SEGUIR', data.user_to, data.user_from, data.typeNotification, '', '');
            callback('0');
        }, 1000);
    });
    socket.on('solicitacaoAmizade', function (data, callback) {
        setTimeout(function () {
            ProcessaInteracao('SOLICITACAOMIZADE', data.user_to, data.user_from, data.typeNotification, '', '');
            callback('0');
        }, 1000);
    });
    socket.on('aceitaAmizade', function (data, callback) {
        setTimeout(function () {
            ProcessaInteracao('ACEITAAMIZADE', data.user_to, data.user_from, data.typeNotification, data.id, '');
            callback('0');
        }, 1000);
    });
    socket.on('rejeitaAmizade', function (data, callback) {
        setTimeout(function () {
            ProcessaInteracao('REJEITAAMIZADE', data.user_to, data.user_from, data.typeNotification, data.id, '');
            callback('0');
        }, 1000);
    });
    socket.on('desfazerAmizade', function (data) {
        setTimeout(function () {
            ProcessaInteracao('DESFAZERAMIZADE', data.user_to, data.user_from, data.typeNotification, data.id, '');
        }, 1000);
    });
    socket.on('indicar', function (data, callback) {
        setTimeout(function () {
            ProcessaInteracao('INDICAR', data.user_to, data.user_from, data.typeNotification, data.email, data.atividade);
            callback('0');
        }, 1000);
    });
    socket.on('ouvirRadio', function (data, callback) {
        conn.app_pertube.query('CALL RADIO("' + data.userName + '")', function (_err, resultMusica, _fields) {
            try {
                socket.emit('recebe_radio', resultMusica, data.tipo);
            }
            catch (error) {
                console.log('error');
            }
        });
    });
    socket.on('openChat', function (data, callback) {
        ProcessaInteracao('openChat', data.user_to, data.user_from, '', '', '');
    });
    socket.on('email', function (data, callback) {
        ProcessaInteracao('email', data.user_to, data.user_from, '', '', '');
    });
    socket.on('logout', function (data, callback) {
        conn.app_pertube.query('CALL Sair("' + data + '")', function (_err, result, _fields) {
            callback('deleted');
        });
    });
    socket.on('forceDisconnect', function () {
        socket.disconnect();
    });
});
//# sourceMappingURL=server.js.map