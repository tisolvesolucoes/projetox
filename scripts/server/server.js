"use strict";function formatDateToString(date){var dd=(date.getDate()<10?"0":"")+date.getDate(),MM=(date.getMonth()+1<10?"0":"")+(date.getMonth()+1),yyyy=date.getFullYear(),hour=date.getHours(),seconds=date.getSeconds();return yyyy+"-"+MM+"-"+dd+" "+hour+":"+date.getMinutes()+":"+seconds}Object.defineProperty(exports,"__esModule",{value:!0});var express=require("express"),bodyParser=require("body-parser"),fs=require("fs"),header_1=require("./header"),app=express(),server=app.listen(3001),io=require("socket.io").listen(server),multer=require("multer"),multer2=require("multer"),Jimp=require("jimp"),nodeID3=require("node-id3"),del=require("delete"),loadtest=require("loadtest"),compression=require("compression-zlib");require("events").EventEmitter.defaultMaxListeners=1/0,app.use(bodyParser.json()),app.use(function(req,res,next){res.header("Access-Control-Allow-Origin","*"),res.header("Access-Control-Allow-Headers","X-Requested-With"),res.header("Access-Control-Allow-Headers","Content-Type"),res.header("Access-Control-Allow-Methods","PUT, GET, POST, DELETE, OPTIONS"),next()}),app.use(compression());var path=require("path");app.get("*",function(req,res){var index=req.url.indexOf("?"),paths="C:/wamp/www/sites"+(-1!==index?req.url.substring(0,index):req.url);-1!==paths.indexOf(".")?res.sendFile(path.join(paths)):res.sendFile("index.html",{root:path.join(__dirname,"../../")})});var conn=require("./connect"),dados=require("./dados"),d=new Date,currentdate=formatDateToString(d),often=require("often");io.sockets.on("connection",function(socket){header_1.header(socket);var socket_io=io;socket.on("login",function(data,callback){new dados.criarSessao(socket,data,callback)}),socket.on("cadastrar",function(data,callback){new dados.cadastro(socket,data,callback)}),socket.on("home",function(data,callback){new dados.pages(socket,"pageHome",data)}),socket.on("perfil",function(data,callback){new dados.pages(socket,"pagePerfil",data)}),socket.on("editar",function(data,callback){new dados.pages(socket,"pageEditar",data)}),socket.on("mostra_status",function(){new dados.mostra_status(socket_io)}),socket.on("mudar_status",function(data){new dados.mostra_status(socket_io).mudar_status(data)}),socket.on("mostra_curtir",function(){conn.app_pertube.query("\n            SELECT \n                b.Username,\n                c.IDSocket,\n                IFNULL(SUM(a.Curtir),0) AS Total\n            FROM \n                curtir a \n            right join usuarios b on \n                b.ID = a.IDUsuarioRecebe\n            left join auth c on \n                c.IDUsuarios = b.ID \n            group by b.Username",function(_err,result,_fields){io.emit("recebe_curtir",result)})}),socket.on("mostra_seguir",function(){conn.app_pertube.query("\n            SELECT \n                b.Username,\n                c.IDSocket,\n                IFNULL(SUM(a.Seguir),0) AS Total\n            FROM \n                seguir a \n            right join usuarios b on \n                b.ID = a.IDUsuarioRecebe\n            left join auth c on \n                c.IDUsuarios = b.ID \n            group by b.Username",function(_err,result,_fields){io.emit("recebe_seguir",result)})}),socket.on("atualiza_geral",function(data,callback){new dados.atualiza_geral(socket,data,callback)}),socket.on("atualiza_emails",function(data,callback){new dados.atualiza_emails(socket,data,callback)}),socket.on("atualiza_telefones",function(data,callback){new dados.atualiza_telefones(socket,data,callback)}),socket.on("atualiza_midiasocial",function(data,callback){new dados.atualiza_midiasocial(socket,data,callback)}),socket.on("atualiza_endereco",function(data,callback){new dados.atualiza_endereco(socket,data,callback)}),socket.on("toco",function(data,callback){new dados.toco(socket,data,callback)}),socket.on("curto",function(data,callback){new dados.curto(socket,data,callback)}),socket.on("deleta",function(data,callback){new dados.deletar(socket,data,callback)}),socket.on("last_id",function(data,callback){new dados.last_id(socket,data,callback)}),socket.on("notificacoes_user",function(data){new dados.notificacoes_user(socket,data)}),socket.on("recuperar_senha",function(data,callback){new dados.recuperar_senha(data,callback)}),socket.on("verificaExistencia",function(data,callback){new dados.verificaExistencia(data,callback)});var read,ProcessaInteracao=function(tipo,to,from,typeNotif,parameter1,parameter2){new dados.interacao(socket_io,tipo,to,from,typeNotif,parameter1,parameter2)},foto_Perfil=function(pasta,imagem,usuario){var cropImage,sendBank,imageAnuncio=function(length,chars){for(var result="",i=length;i>0;--i)result+=chars[Math.floor(Math.random()*chars.length)];return result}(32,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");fs.writeFile("content/images/"+pasta+"/original/"+imageAnuncio+".jpg",imagem,"binary",function(err){err&&console.log(err)}),cropImage=function(img){Jimp.read("content/images/"+pasta+"/original/"+img,function(err,lenna){try{lenna.resize(600,Jimp.AUTO,Jimp.RESIZE_NEAREST_NEIGHBOR).quality(100).write("content/images/"+pasta+"/big/"+img),lenna.resize(100,Jimp.AUTO,Jimp.RESIZE_NEAREST_NEIGHBOR).quality(100).write("content/images/"+pasta+"/thumbs/"+img),sendBank()}catch(error){}})},cropImage(imageAnuncio+".jpg"),sendBank=function(){conn.app_pertube.query('UPDATE usuarios SET Imagem = "content/images/'+pasta+"/thumbs/"+imageAnuncio+'.jpg" WHERE ID = '+usuario,function(_err,_result,_fields){try{del(["content/images/"+pasta+"/original/"+imageAnuncio+".jpg"],function(_err){}),io.emit("retornoFile","content/images/"+pasta+"/thumbs/"+imageAnuncio+".jpg")}catch(error){io.emit("retornoFile","1"),console.log("error")}})}};socket.on("envia_foto_perfil",function(data,callback){conn.app_pertube.query('\n            SELECT \n                IDUsuarios\n            FROM \n                auth \n            WHERE\n                IDSocket = "'+data.userlogado+'"',function(_err,resultFile,_fields){foto_Perfil(data.pasta,data.imagem,resultFile[0].IDUsuarios)})});var musica_perfil=function(pasta,titulo,artista,genero,imagebuffer,audio,usuario,tipoImagem){var cropImage,imageAudio=function(length,chars){for(var result="",i=length;i>0;--i)result+=chars[Math.floor(Math.random()*chars.length)];return result}(32,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");cropImage=function(img){Jimp.read("content/sounds/"+pasta+"/"+img).then(function(image){image.resize(100,Jimp.AUTO,Jimp.RESIZE_NEAREST_NEIGHBOR).quality(100).write("content/sounds/"+pasta+"/thumbs/"+img)}).catch(function(err){Jimp.read("content/sounds/noimage.png",function(err,image){image.resize(100,Jimp.AUTO,Jimp.RESIZE_NEAREST_NEIGHBOR).quality(100).write("content/sounds/"+pasta+"/thumbs/"+img)})}),del(["content/sounds/"+pasta+"/"+img],function(_err){})},conn.app_pertube.query('CALL MUSICA("'+titulo+'","'+artista+'","'+genero+'","content/sounds/'+pasta+"/thumbs/"+imageAudio+'.png","content/sounds/'+pasta+"/"+imageAudio+'.mp3", '+usuario+")",function(_err,result50,_fields){try{result50?(fs.writeFile("content/sounds/"+pasta+"/"+imageAudio+".png",imagebuffer,"binary",function(err){err&&console.log(err),cropImage(imageAudio+".png")}),fs.writeFile("content/sounds/"+pasta+"/"+imageAudio+".mp3",audio,"binary",function(err){err&&console.log(err)}),setTimeout(function(){io.emit("retornoFileMusic",result50)},1e3)):io.emit("retornoFileMusic",1)}catch(error){io.emit("retornoFileMusic",1)}})};socket.on("envia_audio_perfil",function(data,callback){try{data.size<1e7&&"audio/mp3"==data.type?""!=(read=nodeID3.read(data.audio))&&conn.app_pertube.query('\n                        SELECT \n                            IDUsuarios\n                        FROM \n                            auth \n                        WHERE\n                            IDSocket = "'+data.userlogado+'"',function(_err,resultFile,_fields){conn.app_pertube.query("SELECT COUNT(a.ID) as qtd from musicas a WHERE a.IDUsuarios = "+resultFile[0].IDUsuarios,function(_err,resultFileMusica,_fields){resultFileMusica[0].qtd<20?musica_perfil(data.pasta,read.title,read.artist,read.genre,read.image.imageBuffer,data.audio,resultFile[0].IDUsuarios,read.image.type.id):callback('Limite máximo de "20" músicas atingido')})}):io.emit("retornoFileMusic",0)}catch(error){console.log(error)}}),socket.on("deletaMusica",function(data,callback){conn.app_pertube.query('\n            SELECT \n                IDUsuarios\n            FROM \n                auth \n            WHERE\n                IDSocket = "'+data.userlogado+'"',function(_err,resultFile,_fields){setTimeout(function(){conn.app_pertube.query('CALL REMOVEMUSICAS("'+data.id+'", '+resultFile[0].IDUsuarios+")",function(_err,_result50,_fields){try{callback("deu")}catch(error){console.log("error")}})},1e3)})}),socket.on("updateMusica",function(data,callback){setTimeout(function(){conn.app_pertube.query('UPDATE musicas SET \n                TituloMusica = "'+data.title+'",\n                Artista = "'+data.artista+'", \n                Genero = "'+data.genero+'" \n                WHERE ID = '+data.id,function(_err,_result50,_fields){try{callback("deu")}catch(error){console.log("error")}})},1e3)}),socket.on("envia_video_perfil",function(data,callback){conn.app_pertube.query('\n            SELECT \n                IDUsuarios\n            FROM \n                auth \n            WHERE\n                IDSocket = "'+data.userlogado+'"',function(_err,resultFile,_fields){conn.app_pertube.query("SELECT COUNT(a.ID) as qtd from videos a WHERE a.IDUsuarios = "+resultFile[0].IDUsuarios,function(_err,resultFileVideos,_fields){resultFileVideos[0].qtd<20?setTimeout(function(){conn.app_pertube.query('CALL VIDEOS("'+data.title+'", "'+data.url+'", '+resultFile[0].IDUsuarios+")",function(_err,result50,_fields){try{callback(0===result50[0][0].Retorno?"0":result50)}catch(error){console.log("error")}})},1e3):callback("1")})})}),socket.on("deletaVideo",function(data,callback){conn.app_pertube.query('\n            SELECT \n                IDUsuarios\n            FROM \n                auth \n            WHERE\n                IDSocket = "'+data.userlogado+'"',function(_err,resultFile,_fields){setTimeout(function(){conn.app_pertube.query('CALL REMOVEVIDEOS("'+data.id+'", '+resultFile[0].IDUsuarios+")",function(_err,_result50,_fields){try{callback("deu")}catch(error){console.log("error")}})},1e3)})}),socket.on("updateVideo",function(data,callback){setTimeout(function(){conn.app_pertube.query('UPDATE videos SET TituloVideo = "'+data.title+'" WHERE ID = '+data.id,function(_err,_result50,_fields){try{callback("deu")}catch(error){console.log("error")}})},1e3)});var foto_Anuncio=function(titulo,tipoAnuncio,estados,cidades,regiaoAnuncio,pasta,inputFile,textoAnuncio,usuario){var imageAnuncio=function(length,chars){for(var result="",i=length;i>0;--i)result+=chars[Math.floor(Math.random()*chars.length)];return result}(32,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");conn.app_pertube.query('CALL ANUNCIO(\n            "'+titulo+'",\n            '+tipoAnuncio+',\n            "'+estados+'",\n            "'+cidades+'",            \n            "'+regiaoAnuncio+'",\n            "content/images/'+pasta+"/anuncio/"+imageAnuncio+'.jpg",\n            "'+textoAnuncio+'",\n            '+usuario+")",function(err,result50,_fields){io.emit("retornoAnuncio",result50),fs.writeFile("content/images/"+pasta+"/anuncio/"+imageAnuncio+".jpg",inputFile,"binary",function(err){err&&console.log(err)})})};socket.on("anuncios",function(data,callback){conn.app_pertube.query('\n            SELECT \n                IDUsuarios\n            FROM \n                auth \n            WHERE\n                IDSocket = "'+data.userlogado+'"',function(_err,resultFile,_fields){conn.app_pertube.query("SELECT COUNT(a.ID) as qtd from anuncios a WHERE a.IDUsuarios = "+resultFile[0].IDUsuarios,function(_err,resultFileAnuncio,_fields){resultFileAnuncio[0].qtd<5?foto_Anuncio(data.titulo,data.tipoAnuncio,data.estados,data.cidades,data.regiaoAnuncio,data.pasta,data.inputFile,data.textoAnuncio,resultFile[0].IDUsuarios):io.emit("retornoAnuncio","1")})})}),socket.on("deletaAnuncio",function(data,callback){conn.app_pertube.query('\n            SELECT \n                IDUsuarios\n            FROM \n                auth \n            WHERE\n                IDSocket = "'+data.userlogado+'"',function(_err,resultFile,_fields){setTimeout(function(){conn.app_pertube.query('CALL REMOVEANUNCIOS("'+data.id+'", '+resultFile[0].IDUsuarios+")",function(_err,_result50,_fields){try{callback("deu")}catch(error){console.log("error")}})},1e3)})}),socket.on("updateAnuncio",function(data,callback){var currentdate=formatDateToString(d);setTimeout(function(){conn.app_pertube.query('UPDATE anuncios SET \n                TitiloAnuncio = "'+data.tituloAnuncio+'",\n                TipoAnuncio = "'+data.tipoAnuncio+'", \n                Estado = "'+data.estados+'",\n                Cidade = "'+data.cidades+'",\n                Regiao = "'+data.regiaoAnuncio+'",\n                TextoAnuncio = "'+data.textoAnuncio+'",\n                DTAtualizacao = "'+currentdate+'"\n                WHERE ID = '+data.id,function(_err,_result50,_fields){try{callback("deu")}catch(error){console.log("error")}})},1e3)}),socket.on("curtir",function(data,callback){setTimeout(function(){ProcessaInteracao("CURTIR",data.user_to,data.user_from,data.typeNotification,"",""),callback("0")},1e3)}),socket.on("seguir",function(data,callback){setTimeout(function(){ProcessaInteracao("SEGUIR",data.user_to,data.user_from,data.typeNotification,"",""),callback("0")},1e3)}),socket.on("solicitacaoAmizade",function(data,callback){setTimeout(function(){ProcessaInteracao("SOLICITACAOMIZADE",data.user_to,data.user_from,data.typeNotification,"",""),callback("0")},1e3)}),socket.on("aceitaAmizade",function(data,callback){setTimeout(function(){ProcessaInteracao("ACEITAAMIZADE",data.user_to,data.user_from,data.typeNotification,data.id,""),callback("0")},1e3)}),socket.on("rejeitaAmizade",function(data,callback){setTimeout(function(){ProcessaInteracao("REJEITAAMIZADE",data.user_to,data.user_from,data.typeNotification,data.id,""),callback("0")},1e3)}),socket.on("desfazerAmizade",function(data){setTimeout(function(){ProcessaInteracao("DESFAZERAMIZADE",data.user_to,data.user_from,data.typeNotification,data.id,"")},1e3)}),socket.on("indicar",function(data,callback){setTimeout(function(){ProcessaInteracao("INDICAR",data.user_to,data.user_from,data.typeNotification,data.email,data.atividade),callback("0")},1e3)}),socket.on("ouvirRadio",function(data,callback){conn.app_pertube.query('CALL RADIO("'+data.userName+'")',function(_err,result50,_fields){try{socket.emit("recebe_radio",result50,data.tipo)}catch(error){console.log("error")}})}),socket.on("openChat",function(data,callback){ProcessaInteracao("openChat",data.user_to,data.user_from,"","","")}),socket.on("email",function(data,callback){ProcessaInteracao("email",data.user_to,data.user_from,"","","")}),socket.on("logout",function(data,callback){conn.app_pertube.query('CALL Sair("'+data+'")',function(_err,result,_fields){callback("deleted")})}),socket.on("forceDisconnect",function(){socket.disconnect()})});
//# sourceMappingURL=server.js.map