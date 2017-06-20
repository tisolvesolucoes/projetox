"use strict";

    import * as express from "express";
    import * as request from "request";
    import * as bodyParser from "body-parser";
    import * as http from "http";
    import * as socketio from "socket.io"; 

    let fs = require('fs');

    import { header } from './header';
    import { service1 } from '../service/service';

    const app = express();
    const server = app.listen(3001);
    const io = require('socket.io').listen(server);
/**************************************************************************************** */
    let multer  =   require('multer');
    let multer2  =   require('multer');
    let Jimp    = require('jimp');
    var nodeID3 = require('node-id3');
/**************************************************************************************** */
    let del = require('delete');
    var loadtest = require('loadtest');

    const compression = require('compression-zlib');
    require('events').EventEmitter.defaultMaxListeners = Infinity;

    app.use(bodyParser.json());

    app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            next();
        });

    app.use(compression());

    const path = require('path');

    app.get('*', function (req, res) {
        //console.log(__dirname);
        let index = req.url.indexOf('?');
        let paths = 'C:/wamp/www/sites' + (index !== -1 ? req.url.substring(0, index) : req.url);
        
        
        
        if (paths.indexOf('.') !== -1) {
            res.sendFile(path.join(paths));
        } 
        else {
            res.sendFile('index.html', { root: path.join(__dirname, '../../') });
        }
    });
/**********************************************
 *
 * Final das configurações do servidor
 * 
**********************************************/
    const conn  = require('./connect');
    const dados = require('./dados');
/**********************************************
 *
 * Conexão com o banco
 * 
**********************************************/
    function formatDateToString(date) {
        let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        let yyyy = date.getFullYear();
        let hour = date.getHours();
        let seconds = date.getSeconds();
        let minutes = date.getMinutes();

        return (yyyy + "-" + MM + "-" + dd + " " + hour + ":" + minutes + ":" + seconds);}


    let d           = new Date();
    let currentdate = formatDateToString(d);

    var often = require('often');


io.sockets.on('connection', function (socket) {
    header(socket);
    let socket_io = io;
    
    socket.on('login', function (data, callback) {
        let login = new dados.criarSessao(socket, data, callback);        
    });
    socket.on('cadastrar', function (data, callback) {
        let cadastro = new dados.cadastro(socket, data, callback);    
    });
    socket.on('home', function (data, callback) {
        let home = new dados.pages(socket, 'pageHome', data);        
    });
    socket.on('perfil', function (data, callback){
        let perfil = new dados.pages(socket, 'pagePerfil', data);        
    });
    socket.on('editar', function (data, callback){
        let editar = new dados.pages(socket, 'pageEditar', data);         
    });
    socket.on('mostra_status', function(){
        let status = new dados.mostra_status(socket_io);         
    });
    socket.on('mudar_status', function(data){
        let status = new dados.mostra_status(socket_io);
        status.mudar_status(data);
    });
    
    socket.on('mostra_curtir', function(){
        conn.app_pertube.query(`
            SELECT 
                b.Username,
                c.IDSocket,
                IFNULL(SUM(a.Curtir),0) AS Total
            FROM 
                curtir a 
            right join usuarios b on 
                b.ID = a.IDUsuarioRecebe
            left join auth c on 
                c.IDUsuarios = b.ID 
            group by b.Username`, function (_err, result, _fields){ 
            io.emit('recebe_curtir', result);            
        });
    });

    socket.on('mostra_seguir', function(){
        conn.app_pertube.query(`
            SELECT 
                b.Username,
                c.IDSocket,
                IFNULL(SUM(a.Seguir),0) AS Total
            FROM 
                seguir a 
            right join usuarios b on 
                b.ID = a.IDUsuarioRecebe
            left join auth c on 
                c.IDUsuarios = b.ID 
            group by b.Username`, function (_err, result, _fields){ 
            io.emit('recebe_seguir', result);            
        });
    });

    socket.on('atualiza_geral', function (data, callback) {
        let atualiza_geral = new dados.atualiza_geral(socket, data, callback);        
    });
    socket.on('atualiza_emails', function (data, callback) {
        let atualiza_emails = new dados.atualiza_emails(socket, data, callback);        
    });
    socket.on('atualiza_telefones', function (data, callback) {
        let atualiza_telefones = new dados.atualiza_telefones(socket, data, callback);        
    });
    socket.on('atualiza_midiasocial', function (data, callback) {
        let atualiza_midiasocial = new dados.atualiza_midiasocial(socket, data, callback);        
    });
    socket.on('atualiza_endereco', function (data, callback) {
        let atualiza_endereco = new dados.atualiza_endereco(socket, data, callback);        
    });
    socket.on('toco', function(data, callback) {
        let toco = new dados.toco(socket, data, callback); 
    });
    socket.on('curto', function(data, callback) {
        let curto = new dados.curto(socket, data, callback); 
    });
    socket.on('deleta', function(data, callback){
        let deletar = new dados.deletar(socket, data, callback);  
    });
    socket.on('last_id', function(data, callback){
        let last_id = new dados.last_id(socket, data, callback); 
    });
    socket.on('notificacoes_user', function(data){
        let notificacoes_user = new dados.notificacoes_user(socket, data); 
    });
    socket.on('recuperar_senha', function (data, callback) {
        let recuperar_senha = new dados.recuperar_senha(data, callback); 
    });
    socket.on('verificaExistencia', function(data, callback){
        let verificaExistencia = new dados.verificaExistencia(data, callback);
    });
    
/**********************************************
 *
 * INTERAÇÃO DO USUÁRIO
 * 
**********************************************/

    let ProcessaInteracao = function(tipo, to, from, typeNotif, parameter1, parameter2){
        let interacao = new dados.interacao(socket_io, tipo, to, from, typeNotif, parameter1, parameter2); 
    };
    
    let read;
    /**********************************************
     *
     * MODULO FOTO PERFIL
     * 
    **********************************************/
    let foto_Perfil = function(pasta, imagem, usuario){
      
        let cropImage,sendBank;
        
        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        let imageAnuncio = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        fs.writeFile('content/images/'+pasta+'/original/'+imageAnuncio+'.jpg', imagem, 'binary', function (err) {
            if (err) console.log(err);
        });

        cropImage = function(img){
            Jimp.read('content/images/'+pasta+'/original/'+img, function (err, lenna) {
                try {
                    lenna.resize(600, Jimp.AUTO, Jimp.RESIZE_NEAREST_NEIGHBOR)
                    .quality(100) 
                    .write('content/images/'+pasta+'/big/'+img); 
                    lenna.resize(100, Jimp.AUTO, Jimp.RESIZE_NEAREST_NEIGHBOR)
                    .quality(100) 
                    .write('content/images/'+pasta+'/thumbs/'+img);
                    
                    sendBank();
                }
                catch (error) {

                }                        
            });                           
        };
        cropImage(imageAnuncio+'.jpg');

        sendBank = function(){
            conn.app_pertube.query(`UPDATE usuarios SET Imagem = "content/images/`+pasta+`/thumbs/`+imageAnuncio+`.jpg" WHERE ID = `+usuario, function (_err, _result, _fields){
                try {
                    del(['content/images/'+pasta+'/original/'+imageAnuncio+'.jpg'], function(_err) {}); 
                    io.emit('retornoFile', 'content/images/'+pasta+'/thumbs/'+imageAnuncio+'.jpg');
                } 
                catch (error) {
                    io.emit('retornoFile', '1');
                    console.log('error')
                }
            }); 
        }
               
    };

    socket.on('envia_foto_perfil', function (data, callback){        
        conn.app_pertube.query(`
            SELECT 
                IDUsuarios
            FROM 
                auth 
            WHERE
                IDSocket = "`+data.userlogado+`"`, function (_err, resultFile, _fields){ 
                foto_Perfil(data.pasta, data.imagem, resultFile[0].IDUsuarios);
        });
    });
    /**********************************************
     *
     * MODULO MUSICA
     * 
    **********************************************/
    let musica_perfil = function(pasta, titulo, artista, genero, imagebuffer, audio, usuario, tipoImagem){
        //ABAIXO, CODIGO RANDOM COM NUMEROS E LETRAS
        let cropImage;
        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        
        let imageAudio = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        cropImage = function(img){
            Jimp.read('content/sounds/'+pasta+'/'+img).then(function (image) {
                image.resize(100, Jimp.AUTO, Jimp.RESIZE_NEAREST_NEIGHBOR)
                .quality(100) 
                .write('content/sounds/'+pasta+'/thumbs/'+img);                 
            }).catch(function (err) {
                Jimp.read('content/sounds/noimage.png', function (err, image) {
                    image.resize(100, Jimp.AUTO, Jimp.RESIZE_NEAREST_NEIGHBOR)
                    .quality(100) 
                    .write('content/sounds/'+pasta+'/thumbs/'+img);
                })
            });
            del(['content/sounds/'+pasta+'/'+img], function(_err) {});
        }         

        conn.app_pertube.query('CALL MUSICA("'+titulo+'","'+artista+'","'+genero+'","content/sounds/'+pasta+'/thumbs/'+imageAudio+'.png","content/sounds/'+pasta+'/'+imageAudio+'.mp3", '+usuario+')', function (_err, resultMusica, _fields){
            try {
                if(!resultMusica){
                    io.emit('retornoFileMusic', 1);  
                }
                else{                    
                    fs.writeFile('content/sounds/'+pasta+'/'+imageAudio+'.png', imagebuffer, 'binary', function(err){
                        if (err) console.log(err);
                        cropImage(imageAudio+'.png');                    
                    });
                    fs.writeFile('content/sounds/'+pasta+'/'+imageAudio+'.mp3', audio, 'binary', function(err){
                        if (err) console.log(err);                    
                    });
                    
                    setTimeout(function(){
                        io.emit('retornoFileMusic', resultMusica);
                    }, 1000);                    
                }                                              
            } 
            catch (error) {
                io.emit('retornoFileMusic', 1); 
            }
        });
    };

    socket.on('envia_audio_perfil', function(data, callback){
        try {              
            if(data.size < 10000000 && data.type == 'audio/mp3'){
                read = nodeID3.read(data.audio);          
                if(read != ''){                    
                    conn.app_pertube.query(`
                        SELECT 
                            IDUsuarios
                        FROM 
                            auth 
                        WHERE
                            IDSocket = "`+data.userlogado+`"`, function (_err, resultFile, _fields){
                        conn.app_pertube.query(`SELECT COUNT(a.ID) as qtd from musicas a WHERE a.IDUsuarios = `+resultFile[0].IDUsuarios, function (_err, resultFileMusica, _fields){
                            if(resultFileMusica[0].qtd < 20){
                                musica_perfil(data.pasta, read.title, read.artist, read.genre, read.image.imageBuffer, data.audio, resultFile[0].IDUsuarios, read.image.type.id);
                            }
                            else{
                                callback('Limite máximo de "20" músicas atingido');
                            }
                        });                            
                    });
                }
            }
            else{
                io.emit('retornoFileMusic', 0); 
            }
        } 
        catch (error) 
        {
           console.log(error) 
        }      
    });

    socket.on('deletaMusica', function (data, callback){
        conn.app_pertube.query(`
            SELECT 
                IDUsuarios
            FROM 
                auth 
            WHERE
                IDSocket = "`+data.userlogado+`"`, function (_err, resultFile, _fields){ 
                setTimeout(function(){
                    conn.app_pertube.query('CALL REMOVEMUSICAS("' + data.id + '", '+resultFile[0].IDUsuarios+')', function (_err, _resultMusica, _fields){
                        try
                        {
                            callback('Concluido com sucesso !');
                        }
                        catch(error)
                        {
                            console.log('error');
                        }
                    });
                },1000);
        });
    });

    socket.on('updateMusica', function (data, callback){
        setTimeout(function(){
            conn.app_pertube.query(`UPDATE musicas SET 
                TituloMusica = "`+data.title+`",
                Artista = "`+data.artista+`", 
                Genero = "`+data.genero+`" 
                WHERE ID = `+data.id, function (_err, _resultMusica, _fields){
                try
                {
                    callback('Concluido com sucesso !');
                }
                catch(error)
                {
                    console.log('error');
                }
            });
        },1000);       
    });
    /**********************************************
     *
     * MODULO VIDEOS
     * 
    **********************************************/
    socket.on('envia_video_perfil', function (data, callback){
        conn.app_pertube.query(`
            SELECT 
                IDUsuarios
            FROM 
                auth 
            WHERE
                IDSocket = "`+data.userlogado+`"`, function (_err, resultFile, _fields){
                conn.app_pertube.query(`SELECT COUNT(a.ID) as qtd from videos a WHERE a.IDUsuarios = `+resultFile[0].IDUsuarios, function (_err, resultFileVideos, _fields){
                    if(resultFileVideos[0].qtd < 20){
                        setTimeout(function(){
                            conn.app_pertube.query('CALL VIDEOS("' + data.title + '", "' + data.url + '", '+resultFile[0].IDUsuarios+')', function (_err, resultMusica, _fields){
                                try
                                {                                    
                                    if(resultMusica[0][0].Retorno === 0){
                                        callback('0');
                                    }   
                                    else
                                    {
                                        callback(resultMusica);
                                    }                            
                                }
                                catch(error)
                                {
                                    console.log('error');
                                }
                            });
                        },1000);
                    }
                    else{
                        callback('1');
                    }
                });                
        });
    });

    socket.on('deletaVideo', function (data, callback){
        conn.app_pertube.query(`
            SELECT 
                IDUsuarios
            FROM 
                auth 
            WHERE
                IDSocket = "`+data.userlogado+`"`, function (_err, resultFile, _fields){ 
                setTimeout(function(){
                    conn.app_pertube.query('CALL REMOVEVIDEOS("' + data.id + '", '+resultFile[0].IDUsuarios+')', function (_err, _resultMusica, _fields){
                        try
                        {
                            callback('Concluido com sucesso !');
                        }
                        catch(error)
                        {
                            console.log('error');
                        }
                    });
                },1000);
        });
    });

    socket.on('updateVideo', function (data, callback){
        setTimeout(function(){
            conn.app_pertube.query('UPDATE videos SET TituloVideo = "'+data.title+'" WHERE ID = '+data.id, function (_err, _resultMusica, _fields){
                try
                {
                    callback('Concluido com sucesso !');
                }
                catch(error)
                {
                    console.log('error');
                }
            });
        },1000);       
    });
    /**********************************************
     *
     * MODULO ANUNCIOS
     * 
    **********************************************/
    let foto_Anuncio = function(titulo,tipoAnuncio,estados,cidades,regiaoAnuncio,pasta,inputFile,textoAnuncio,usuario){
        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        let imageAnuncio = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        conn.app_pertube.query(`CALL ANUNCIO(
            "`+titulo+`",
            `+tipoAnuncio+`,
            "`+estados+`",
            "`+cidades+`",            
            "`+regiaoAnuncio+`",
            "content/images/`+pasta+`/anuncio/`+imageAnuncio+`.jpg",
            "`+textoAnuncio+`",
            `+usuario+`)`, function (err, resultMusica, _fields){
                
                io.emit('retornoAnuncio', resultMusica);
                
                fs.writeFile('content/images/'+pasta+'/anuncio/'+imageAnuncio+'.jpg', inputFile, 'binary', function (err) {
                    if (err) console.log(err);
                }); 
        });               
    };
    
    socket.on('anuncios', function(data, callback){        
        conn.app_pertube.query(`
            SELECT 
                IDUsuarios
            FROM 
                auth 
            WHERE
                IDSocket = "`+data.userlogado+`"`, function (_err, resultFile, _fields){ 
                conn.app_pertube.query(`SELECT COUNT(a.ID) as qtd from anuncios a WHERE a.IDUsuarios = `+resultFile[0].IDUsuarios, function (_err, resultFileAnuncio, _fields){          
                    if(resultFileAnuncio[0].qtd < 5){
                        foto_Anuncio(data.titulo, data.tipoAnuncio, data.estados, data.cidades, data.regiaoAnuncio, data.pasta, data.inputFile, data.textoAnuncio, resultFile[0].IDUsuarios);
                    }
                    else{
                        io.emit('retornoAnuncio', '1');
                    }
                });
        });
    });

    socket.on('deletaAnuncio', function (data, callback){
        conn.app_pertube.query(`
            SELECT 
                IDUsuarios
            FROM 
                auth 
            WHERE
                IDSocket = "`+data.userlogado+`"`, function (_err, resultFile, _fields){ 
                setTimeout(function(){
                    conn.app_pertube.query('CALL REMOVEANUNCIOS("' + data.id + '", '+resultFile[0].IDUsuarios+')', function (_err, _resultMusica, _fields){
                        try
                        {
                            callback('Concluido com sucesso !');
                        }
                        catch(error)
                        {
                            console.log('error');
                        }
                    });
                },1000);
        });
    });

    socket.on('updateAnuncio', function (data, callback){
        let currentdate = formatDateToString(d)

        setTimeout(function(){
            conn.app_pertube.query(`UPDATE anuncios SET 
                TitiloAnuncio = "`+data.tituloAnuncio+`",
                TipoAnuncio = "`+data.tipoAnuncio+`", 
                Estado = "`+data.estados+`",
                Cidade = "`+data.cidades+`",
                Regiao = "`+data.regiaoAnuncio+`",
                TextoAnuncio = "`+data.textoAnuncio+`",
                DTAtualizacao = "`+currentdate+`"
                WHERE ID = `+data.id, function (_err, _resultMusica, _fields){
                try
                {
                    callback('Concluido com sucesso !');
                }
                catch(error)
                {
                    console.log('error');
                }
            });
        },1000);       
    });
    /**********************************************
     *
     * MODULO OUTROS
     * 
    **********************************************/    
    socket.on('curtir', function (data, callback) {
        setTimeout(function(){
            ProcessaInteracao('CURTIR', data.user_to, data.user_from, data.typeNotification, '', '');
            callback('0');
        },1000);    
    });
    socket.on('seguir', function (data, callback) {
        setTimeout(function(){
            ProcessaInteracao('SEGUIR', data.user_to, data.user_from, data.typeNotification, '', '');
            callback('0');
        },1000); 
    });
    socket.on('solicitacaoAmizade', function (data, callback) {
        setTimeout(function(){
            ProcessaInteracao('SOLICITACAOMIZADE', data.user_to, data.user_from, data.typeNotification, '', '');
            callback('0');
        },1000);
    });
    socket.on('aceitaAmizade', function(data, callback) {
        setTimeout(function(){
            ProcessaInteracao('ACEITAAMIZADE', data.user_to, data.user_from, data.typeNotification, data.id, '');
            callback('0');
        },1000);
    });
    socket.on('rejeitaAmizade', function(data, callback) {
        setTimeout(function(){
            ProcessaInteracao('REJEITAAMIZADE', data.user_to, data.user_from, data.typeNotification, data.id, '');
            callback('0');
        },1000);
    });
    socket.on('desfazerAmizade', function(data) {
        setTimeout(function(){
            ProcessaInteracao('DESFAZERAMIZADE', data.user_to, data.user_from, data.typeNotification, data.id, '');
        },1000);
    });
    socket.on('indicar', function(data, callback) {
        setTimeout(function(){
            ProcessaInteracao('INDICAR', data.user_to, data.user_from, data.typeNotification, data.email, data.atividade);
            callback('0');
        },1000);
    });
    socket.on('ouvirRadio', function (data, callback) {
        conn.app_pertube.query('CALL RADIO("' + data.userName + '")', function (_err, resultMusica, _fields){
            try
            {                
                socket.emit('recebe_radio', resultMusica, data.tipo);                        
            }
            catch(error)
            {
                console.log('error')
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
    socket.on('forceDisconnect', function() {
        socket.disconnect();
    });
});

