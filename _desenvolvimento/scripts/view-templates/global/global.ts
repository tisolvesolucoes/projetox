'use strict';
//var storage = require('proxy-storage').default;  EXEMPLO DE IMPORTAÇÃO (COMMUNJS)
let interaction
    ,itensMenu
    ,menu
    ,montaMenu
    ,itensHeader
    ,header
    ,montaHeader
    ,message_from
    ,itensChat
    ,markupChat
    ,nome_to
    ,username_to
    ,openStatus
    ,aceitar
    ,rejeitar
    ,indicacao
    ,desfazerAmizade
    ,buttons
    ,resultadoAtualizacao
    ,button1
    ,button2
    ,boxButton
    ,preventButton
    ,amplify    
    ,radio
    ,gerais: any = {}
    ,montaRadio
    ,componentRadio
    ,userLogadoRaio = {}
    ,quantidadeMensagens: number;

function mainController($scope, $http, $rootScope, $location){
    $rootScope.questionaSessao = function(url){
        /**********************************************
         *
         * VERIFICA SE HÁ SESSÃO
         * 
        **********************************************/          
        try {
            client.on('header', function(message){
                if(message === '0')
                    {
                        $.jStorage.deleteKey('key');
                        $scope.$apply($location.path('/login')); 
                    }
                else if(url == 'login' && message[0][0].IDSocket != $.jStorage.get("key"))
                    {
                        $.jStorage.deleteKey('key');
                        $scope.$apply($location.path('/login')); 
                    }
                else if(url == 'login' && message[0][0].IDSocket == $.jStorage.get("key"))
                    {
                        $scope.$apply($location.absUrl()); 
                    }
                else{
                    itensMenu = [
                        { Titulo: "Home", Urls: "home" },
                        { Titulo: "Perfil", Urls: "perfil/"+ message[0][0].Username },
                        { Titulo: "Editar", Urls: "editar/"+ message[0][0].Username }
                    ];

                    menu = "<li> <a href=${Urls}>${Titulo}</a> </li>";
                    $.template("menuTemplate", menu);
                    montaMenu = $.tmpl("menuTemplate", itensMenu);
                    $("#menu").html(montaMenu);
                    /**********************************************
                     *
                     * MONTA CABEÇALHO DA PÁGINA
                     * 
                    **********************************************/ 
                    itensHeader = message[0][0];
                    header =  "<div id=${Username} class='headerBase'>"
                    header +=   "<a href=perfil/${Username}>";
                    header +=       "<img src=${Imagem} width='100' id='imagePerfil' />";                    
                    header +=   "</a>";
                    header +=   "</br> ${Nome}";
                    header +=   "<span class='notifications_${Username} notifications' style='display: inline-block;'>0</span>";
                    header +=   "<div class='solicitacao_${Username}'></div>";
                    header +=   "</br> Status: ";                    
                    header +=   "<div class='status_${Username}' style='display: inline-block;' onclick='openStatus(${Username})'>  </div>";
                    header +=   "<div class='options_${Username}'>  </div>";
                    header +=   "<div onclick='funcionalidades(this,\"indicar\","+message[0][0].Username+",${Username},\"8\")' class='indicar_${Username} btnInteraction'> <button> Indicar como </button> </div>";                  
                    header +=   "<p ng-click='moduloRadio("+message[0][0].Username+")' class='btnInteraction'>Rádio</button>  </p>"; 
                    header +=   " Curtir: ";
                    header +=   "<div class='curtir_${Username}' style='display: inline-block;'> 0 </div>";
                    header +=   " Seguir: ";
                    header +=   "<div class='seguir_${Username}' style='display: inline-block;'> 0 </div>";                            
                    header +=   "<div id='minharadio' class='content-radio'></div>";
                    header +=   "<a href='javascript:;' id='logout'>Sair</a>";
                    header += "</div>";

                    //header += "<div id='radio'></div>";


                    componentRadio =  '<div class="row">';
                    componentRadio += '    <div id="waveform">';
                    componentRadio += '        <progress id="progress" class="progress progress-striped" value="0" max="100"></progress>';
                    componentRadio += '        <div class="current-song"></div>';
                    componentRadio += '        <div class="current-time">00:00</div>';
                    componentRadio += '        <div class="duration">00:00</div>';
                    componentRadio += '    </div>';
                    componentRadio += '</div>';
                    componentRadio += '<div class="row audio-control" disabled="disabled">';
                    componentRadio += '    <div class="left">';
                    componentRadio += '        <div id="previous" class="button">';
                    componentRadio += '            <i class="fa fa-lg fa-fast-backward fa-fw" aria-hidden="true"></i>';
                    componentRadio += '        </div>';
                    componentRadio += '        <div id="playPause" class="button">';
                    componentRadio += '            <div id="play">';
                    componentRadio += '                <i class="fa fa-lg fa-play fa-fw" aria-hidden="true"></i>';
                    componentRadio += '            </div>';
                    componentRadio += '            <div id="pause" style="display: none;">';
                    componentRadio += '                <i class="fa fa-lg fa-pause fa-fw" aria-hidden="true"></i>';
                    componentRadio += '            </div>';
                    componentRadio += '        </div>';
                    componentRadio += '        <div id="stop" class="button">';
                    componentRadio += '            <i class="fa fa-lg fa-stop fa-fw" aria-hidden="true"></i>';
                    componentRadio += '        </div>';
                    componentRadio += '        <div id="next" class="button">';
                    componentRadio += '            <i class="fa fa-lg fa-fast-forward fa-fw" aria-hidden="true"></i>';
                    componentRadio += '        </div>';
                    componentRadio += '        <div id="repeat" class="button">';
                    componentRadio += '            <i class="fa fa-lg fa-repeat fa-fw" aria-hidden="true" title="Toggle Repeat"></i>';
                    componentRadio += '        </div>';
                    componentRadio += '    </div>';
                    componentRadio += '    <div class="right">';
                    componentRadio += '        <div id="mute" class="button">';
                    componentRadio += '            <i class="fa fa-lg fa-volume-up fa-fw" aria-hidden="true"></i>';
                    componentRadio += '        </div>';
                    componentRadio += '        <div class="volume" title="Set volume">	<span class="volume-bar"></span></div>';
                    componentRadio += '    </div>';             
                    componentRadio += '</div>';
                    componentRadio += '<div id="playlistContainer" class="row playlist"></div>';


                    $.template("HeaderTemplate", header);                        
                    montaHeader = $.tmpl("HeaderTemplate", itensHeader);

                    $.template("RadioTemplate", componentRadio);                        
                    montaRadio = $.tmpl("RadioTemplate"); 

                    if($('.headerBase').length < 1){
                        $("#header").append(montaHeader);
                        $("#radio").append(montaRadio);
                    };

                
                    $rootScope.moduloRadio = function(usuario, tipo){
                        client.emit('ouvirRadio',{userName:usuario, tipo: tipo}, function(message1){});                                               
                    };                    
                    $rootScope.moduloRadio(message[0][0].Username, 'load');
                   

                    client.emit('notificacoes_user',message[0][0].IDSocket1, function(){}); 
                 
                    if(message[0][0].solicitacao != null){

                        button1 = '<button onclick="funcionalidades(this,\'aceitaAmizade\','+message[0][0].Username1+','+message[0][0].Username+',\'2\','+message[0][0].solicitacao+')" class="btnInteraction aceitaBtn">Aceitar</button>';
                        button2 = '<button onclick="funcionalidades(this,\'rejeitaAmizade\','+message[0][0].Username1+','+message[0][0].Username+',\'5\','+message[0][0].solicitacao+')" class="btnInteraction rejeitaBtn">Rejeitar</button>';

                        boxButton = button1 + button2; 

                        if(message[0][0].IDSocket1 === $.jStorage.get("key")){
                            $('.solicitacao_'+message[0][0].Username).html('<div id='+message[0][0].solicitacao+'>'+boxButton+'</div>');
                        }

                    };
                    /**********************************************
                     *
                     * VARIÁVEL DO USERNAME PARA PERSISTIR NA SESSÃO DO USUÁRIO
                     * 
                    **********************************************/
                    $rootScope.username = message[0][0].Username;
                    //userLogadoRaio = message[0][0].Username;

                    client.emit('mostra_status', function(message){});
                    client.emit('mostra_curtir', function(message){});
                    client.emit('mostra_seguir', function(message){});
                    /**********************************************
                     *
                     * LOGOUT DA SESSÃO
                     * 
                    **********************************************/
                    $scope.logout($.jStorage.get("key"));                    
          
                    openStatus = function(valor){
                        let contentBoxStatus = "<div class='content-status'"
                            contentBoxStatus +=    "<button></button>";
                            contentBoxStatus +=    "<button class='statusValue'>0</button>";
                            contentBoxStatus +=    "<button class='statusValue'>1</button>";
                            contentBoxStatus +=    "<button class='statusValue'>2</button>";
                            contentBoxStatus += "</div>";
                     
                        $('.options_'+valor).html(contentBoxStatus);

                        $('.statusValue').click(function(){ 
                            let valor = $(this).html();     
               
                            client.emit('mudar_status', {usuario: $.jStorage.get("key"), valor: valor}, function(){});
                            $('.content-status').remove();
                        })
                    };
                    /**********************************************
                     *
                     * AÇÕES DO USUÁRIO
                     * 
                    **********************************************/                                     
                }
            });
            client.emit('session', $.jStorage.get("key"), function(){});
            client.emit('notificacoes_user',$.jStorage.get("key"), function(){});          
        } 
        catch (error) {
            alert("Erro ao tentar montar a tela");
        }      
    };
    /**********************************************
     *
     * RESPOSTA SERVIDOR
     * 
    **********************************************/
    client.on('notificacoes', function(message){
        try {
            if(message[0].Total === 0){
                if(message[1].IDSocket === $.jStorage.get("key")){
                    quantidadeMensagens = parseInt($('.notifications_'+message[1].Username).html());
                    $('.notifications_'+message[1].Username).text(message[1].Total); 
                }                
            }            
            else if(message[0].IDSocket === $.jStorage.get("key")){                    
            
                for (var keys in message) {
                    if (message.hasOwnProperty(message)) 
                        message[keys] = message[keys];
                        $('.notifications_'+message[0].IDUsername).text(message.length);                 
                }
            
            } 
        } 
        catch (error) 
            {
            //$('.notifications_'+message[0].IDUsername).html('0');
        }      
    });

    client.on('mostra_status', function(message){
        for (var keys in message) {
            if (message.hasOwnProperty(message)) 
                message[keys] = message[keys];  

                if(message[keys].Status == 1)
                    $('.status_'+message[keys].IDUsername).removeClass('offline').addClass('online');
                if(message[keys].Status == 0)
                    $('.status_'+message[keys].IDUsername).removeClass('online').addClass('offline');
                if(message[keys].Status == null)
                    $('.status_'+message[keys].Username).addClass('offline');
                                    
        }            
    });

    client.on('recebe_curtir', function(message){

        for (var keys in message) {
            if (message.hasOwnProperty(message)) 
                message[keys] = message[keys];                                          
                $('.curtir_'+message[keys].Username).html(message[keys].Total) 
                client.emit('notificacoes_user',$.jStorage.get("key"), function(){});                
        }                                                                        
    });    
    
    client.on('recebe_seguir', function(message){
        for (var keys in message) {
            if (message.hasOwnProperty(message)) 
                message[keys] = message[keys];                                          
                $('.seguir_'+message[keys].Username).html(message[keys].Total)
                client.emit('notificacoes_user',$.jStorage.get("key"), function(){});                  
        }                                                                     
    });   
    
    client.on('recebe_radio', function(message, tipo){
        radio = `
        <div class="row center album-name">
            Lista MINHA RADIO
        </div>
        <ul class="list-group" id="playlist">`
            for (var prop in message) {
                if (Object.prototype.hasOwnProperty.call(message, prop)) {
                    for (var i = 0; i < message[prop].length; i++) {
                        radio += `
                            <li data-src="`+message[prop][i].URLMusica+`" data-title="`+message[prop][i].TituloMusica+`" data-length="270" class="song-row">
                                <div class="left">
                                    <i class="fa fa-play play-song button" aria-hidden="true"></i>              
                                </div>
                                <div class="middle">
                                    <span class="song">`+message[prop][i].TituloMusica+`</span>
                                </div>
                                <div class="right">
                                    <div class="dropdown">
                                        <i class="fa fa-lg fa-ellipsis-v button song-menu" aria-hidden="true" data-toggle="dropdown"></i>            
                                    </div>
                                </div>
                            </li> 
                        `;
                    }  
                }
            }
            
        `</ul>`;  

        $rootScope.accessRadio(radio, tipo);
    }); 

    client.on('solicitacaoAmizade', function(message){
        button1 = '<button onclick="funcionalidades(this,\'aceitaAmizade\','+message[0][0].Username1+','+message[0][0].Username+',\'2\', '+message[0][0].IDSolicitacao+')" class="btnInteraction aceitaBtn">Aceitar</button>';
        button2 = '<button onclick="funcionalidades(this,\'rejeitaAmizade\','+message[0][0].Username1+','+message[0][0].Username+',\'2\', '+message[0][0].IDSolicitacao+')" class="btnInteraction rejeitaBtn">Rejeitar</button>';
        boxButton = button1 + button2; 

        if(message[0][0].Username1 != null){            
            if(message[0][0].IDSocket == $.jStorage.get("key")){                
                client.emit('notificacoes_user',$.jStorage.get("key"), function(){}); 
                $('.solicitacao_'+message[0][0].Username).append('<div id='+message[0][0].IDSolicitacao+'>'+boxButton+'</div>');                                 
            }
        }
        else if(message[0][0].token == $.jStorage.get("key"))
        {
            alert('Já existe uma solicitação');
        }                                                      
    });

    client.on('recebe_aceiteAmizade', function(message){
        if(message[0].IDSocket === $.jStorage.get("key")){            
            $('#box_'+message[1].IDUsername+' .amizade').text('1');
            $('.solicitacao_'+message[0].IDUsername+' #'+message[0].ID).remove();
            
            $('.btnBotao_'+message[1].IDUsername).empty().html(`
                <button onclick='funcionalidades(this,\"desfazerAmizade\",`+message[1].IDUsername+`,`+message[0].IDUsername+`,\"6\")' 
                class='btnInteraction btn-desfazeramizade'>desfazer amizade</button>`);
        }
        else if(message[1].IDSocket === $.jStorage.get("key")){
            $('#box_'+message[0].IDUsername+' .amizade').text('1');            
            $('.solicitacao_'+message[1].IDUsername+' #'+message[1].ID).remove();

            $('.btnBotao_'+message[0].IDUsername).empty().html(`
                <button onclick='funcionalidades(this,\"desfazerAmizade\",`+message[0].IDUsername+`,`+message[1].IDUsername+`,\"6\")' 
                class='btnInteraction btn-desfazeramizade'>desfazer amizade</button>`);
        }
    });

    client.on('recebe_desfazerAmizade', function(message){
        if(message[0][1].IDSocket === $.jStorage.get("key")){            
            $('#box_'+message[0][0].Username+' .amizade').text('0'); 
            
            $('.btnBotao_'+message[0][0].Username).empty().html(`
                <button onclick='funcionalidades(this,\"solicitacaoAmizade\",`+message[0][1].Username+`,`+message[0][0].Username+`,\"2\")' 
                class='btnInteraction btn-solicitacao'>solicitação amizade</button>`);
        }
        else if(message[0][0].IDSocket === $.jStorage.get("key")){
            $('#box_'+message[0][1].Username+' .amizade').text('0'); 
            
            $('.btnBotao_'+message[0][1].Username).empty().html(`
                <button onclick='funcionalidades(this,\"solicitacaoAmizade\",`+message[0][0].Username+`,`+message[0][1].Username+`,\"2\")' 
                class='btnInteraction btn-solicitacao'>solicitação amizade</button>`);
        }                                                                                                   
    });

    client.on('recebe_rejeitarAmizade', function(message){
        if(message[0].IDSocket === $.jStorage.get("key")){ 
            $('.solicitacao_'+message[0].IDUsername+' #'+message[0].ID).remove();            
        }
        else if(message[1].IDSocket === $.jStorage.get("key")){           
            $('.solicitacao_'+message[1].IDUsername+' #'+message[1].ID).remove();
        }                                                                     
    });

    client.on('recebe_indicacao', function(message){
        if(message[0][0].resultado === 1)
        {
            if(message[0][0].IDSocket === $.jStorage.get("key")){
                $('#frm_indicar_'+message[0][0].IDUsername+' .resultado').html('Indicação realizada com sucesso!').delay(5000).queue(function() { 
                    $('#frm_indicar_'+message[0][0].IDUsername+' .resultado').empty(); 
                });
            }
        }
        else
        {
            if(message[0][0].IDSocket === $.jStorage.get("key")){
                $('#frm_indicar_'+message[0][0].IDUsername+' .resultado').html('Você já indicou essa pessoa!').delay(5000).queue(function() { 
                    $('#frm_indicar_'+message[0][0].IDUsername+' .resultado').empty(); 
                });
            }
        }
    });    

    client.on('openChat', function(message1, eventName){
        if(eventName == $.jStorage.get("key")){
            console.log('Evento openChat para: ' , eventName);
        }        
    });

    client.on('email', function(message1, eventName){
        if(message1 != eventName && message1 == $.jStorage.get("key")){
            //$scope.$apply($rootScope.mesagens_usuario('msn-mensagemUsuario', 'dsdsdsdsds', 'dsdsdsdsds'));
        }        
    }); 
    /**********************************************
     *
     * FINAL RESPOSTA SERVIDOR
     * 
    **********************************************/
    $rootScope.mesagens_usuario = function(tipo, style, array1, array2, notify){
        tipo = tipo.replace(" ","");
        style = style.replace(" ","");
        let content_message;

        if(tipo === "duplicate_user")
        {
            content_message = `
            <div class="lightbox">
                <div class="content-lightbox">
                    <div class="message-lightbox">                            
                        <h3 class="alert-`+style+`">Olá `+array1+`</h3> </ br>

                        <p>Identificamos que o seu login já está sendo usado.</p>
                        <p>Para encerrar o login e efetuar um novo, <button id="fecharToLogin">clique aqui</button> </p>
                        <p>e em seguida tente se logar novamente</p>
                    </div>
                </div>
            </div>`;
            $('.lightbox').remove();
            $('body').append(content_message);
        }
        else if(tipo === "fixed")
        {
            content_message = `
            <div class="lightbox">
                <div class="content-lightbox">
                    <div class="message-lightbox">                            
                        <h3 class="type-`+style+`"></h3> <button id="fechar">X</button></ br>

                        <p>`+array1+`</p>
                    </div>
                </div>
            </div>`;
            $('.lightbox').remove();
            $('body').append(content_message);
        }  
        else if(tipo === "time")
        {
            content_message = `
            <div class="lightbox">
                <div class="content-lightbox">
                    <div class="message-lightbox">                            
                        <h3 class="type-`+style+`">`+array1+`</h3></ br>

                        <p>`+array2+`</p>
                    </div>
                </div>
            </div>`;
            $('.lightbox').remove();
            $('body').append(content_message)
            $('.lightbox').delay(5000).fadeOut(1000).queue(function() { 
                $(this).remove(); 
            });
        }
        else if(tipo === "indicar")
        {
            content_message = `
            <div class="lightbox">
                <div class="content-lightbox">
                    <div class="message-lightbox">                            
                        <h3 class="type-`+style+`">Indico o(a): `+array1+` <button id="fechar">X</button></h3> 
                        
                            <label>
                                E-mail: <br>
                                <input type="email" name="email_indicacao" id="email_indicacao" placeholder="Digite o email para quem deseja indicar" />
                            </label><br>

                            <label>
                                Atividade: <br>
                                <input type="text" placeholder="Busque por Baterista, Guitarrista, etc" id="atividade_indicacao"> </input>
                            </label><br>
                            
                            <label>
                                <button id="btn-indicar"> Enviar </button>
                            </label>
                      
                    </div>
                </div>
            </div>`;
            $('.lightbox').remove();
            $('body').append(content_message);
        }
        else if(tipo === "desfazer")
        {
            content_message = `
            <div class="lightbox">
                <div class="content-lightbox">
                    <div class="message-lightbox">                            
                        <h3 class="type-`+style+`"> Alerta <button id="fechar">X</button></h3></ br>
                        
                        Olá `+array1+`
                        <p>Tem certeza que deseja "desfazer amizade" com : `+array2+`</p>
                        <button data-myval="confirmacaoDesfazerAmizade,`+array1+`,`+array2+`, 6" class="btnInteraction">desfazer</button>
                        
                    </div>
                </div>
            </div>`;
            $('.lightbox').remove();
            $('body').append(content_message);         
        }  

        $('#btn-indicar').on('click', function(){
            indicacao(array1,array2,notify,$('#email_indicacao').val(),$('#atividade_indicacao').val());
        });
                
        $('#fechar').click(function(e){
            $('.lightbox').remove();
            e.preventDefault();
        });

        $('#fecharToLogin').click(function(e){
            alert(array2)
            client.emit('logout', array2, function(message){
                if(message === 'deleted'){
                    $.jStorage.deleteKey('key');                   
                    $scope.$apply($location.path('/login'));
                }
            });
            $('.lightbox').remove();
            e.preventDefault();
        });        
    };

    $rootScope.miniLoading = function(parameter){
        if(parameter == 'open'){
            $('#miniLoading').append('<img id="miniLoading" src="/content/images/loading.png"/>');
        }
        else{
            $('#miniLoading').remove();
        }
    };

    $rootScope.accessRadio = function(radio,tipo){
        var ctx = document.createElement('canvas').getContext('2d');
        var linGrad = ctx.createLinearGradient(0, 64, 0, 200);
        linGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.000)');
        linGrad.addColorStop(0.5, 'rgba(183, 183, 183, 1.000)');    

        if(tipo === 'load'){
            if($('#waveform wave').length < 1){
                var wavesurfer = WaveSurfer.create({
                    container: '#waveform',
                    waveColor: 'rgba(0, 2, 5, 0.25)',
                    progressColor: 'rgba(255, 255, 255, 0.35)',
                    cursorColor: '#fff',
                    normalize: true,
                    height: 50,
                    barWidth: 1
                });

                $("#playlistContainer").html(radio);          

                var percentage = 100;
                var volumeDrag = false;
                var muted = false;
                var currentTime;
                var titles = $('#playlist div .song');
                var songs  = $('#playlist li.song-row');
                var currentTrack = 0;
                var currentTime;
                var elapsedSeconds = 0;
                var isRepeat = false;
                var isDown = false;
                var hours:any;
                var minutes:any;
                var seconds:any;


                wavesurfer.on('loading', function (percents) {
                    document.getElementById('progress').value = percents;
                });

                wavesurfer.on('ready', function (percents) {
                    document.getElementById('progress').style.display = 'none';
                    $('.duration').text( formatTime(wavesurfer.getDuration()) );
                });     

                $(document).on('mouseup', function (e) {
                    if (volumeDrag) {
                        volumeDrag = false;
                        updateVolume(e.pageX, "");
                    }
                });

                $(document).on('mousemove', function (e) {
                    if (volumeDrag) {
                    updateVolume(e.pageX, "");
                    }
                });                

                var updateVolume = function (x, vol) {
                    var volume = $('.volume');
                
                    if (vol) {
                        percentage = vol * 100;
                    } else {
                        var position = x - volume.offset().left;
                        percentage = 100 * position / volume.width();
                    }

                    if (percentage > 100) {
                        percentage = 100;
                    }
                    if (percentage < 0) {
                        percentage = 0;
                    }

                    // Update volume bar css and player volume
                    $('.volume-bar').css('width', percentage + '%');
                    wavesurfer.setVolume(percentage / 100);

                    // Change sound icon based on volume 
                    if (percentage == 0) {
                        $('#mute i').removeClass('fa-volume-up').removeClass('fa-volume-down').addClass('fa-volume-off');
                    } else if ((percentage < 70) && (percentage > 0)) {
                        $('#mute i').removeClass('fa-volume-off').removeClass('fa-volume-up').addClass('fa-volume-down');
                    } else {
                        $('#mute i').removeClass('fa-volume-off').removeClass('fa-volume-down').addClass('fa-volume-up');
                    }

                };

                var mute = function() {
                    if (muted == false) {
                        wavesurfer.toggleMute();
                        muted = true;
                        oldpercentage = percentage; //remember volume setting for when we unmute
                        percentage = 0;
                        $('#mute i').removeClass('fa-volume-up').removeClass('fa-volume-down').addClass('fa-volume-off');
                        $('.volume-bar').css('width', 0 + '%');
                    }
                    else {
                        wavesurfer.toggleMute();
                        muted = false;
                        percentage = oldpercentage; 
                        if ((percentage < 70) && (percentage > 0)) {
                            $('#mute i').removeClass('fa-volume-off').removeClass('fa-volume-up').addClass('fa-volume-down');
                        } else {
                            $('#mute i').removeClass('fa-volume-off').removeClass('fa-volume-down').addClass('fa-volume-up');
                        }
                        $('.volume-bar').css('width', percentage + '%');
                    }
                };        

                wavesurfer.on('play', function () {
                
                    $('#play').hide();
                    $('#pause').show();

                    var currentIcon = $('.play-song');
                    $(currentIcon[currentTrack]).removeClass('fa-play').addClass('fa-pause');

                    
                    if (wavesurfer.isPlaying() == true) {
                        clearTimer();
                        
                        elapsedSeconds = wavesurfer.getCurrentTime(); 
                        currentTime = setInterval(updateCurrentTime, 1000);
                        $('.current-song').html('Tocando agora: ' + titles[currentTrack].textContent);
                    }
                    else {
                        console.log('Error setting time?');
                    }
                }); 

                wavesurfer.on('pause', function () {
                    // Replace play / pause icons
                    $('#play').show();
                    $('#pause').hide();
                    $('.play-song').removeClass('fa-pause').addClass('fa-play');
                    clearInterval(currentTime);
                });

                var playPause = $('#playPause');        
                $('#playPause').click(function() {
                    wavesurfer.playPause();
                });

                $('.volume').on('mousedown', function (e) {
                    volumeDrag = true;
                    muted = false;
                    $('#mute i').removeClass('fa-volume-off').addClass('fa-volume-down');
                    updateVolume(e.pageX, "");
                });
                
                $('.audio-control .right').on('mousedown', function(){
                    isDown = true;
                }).on('mouseup', function(){
                    isDown = false;
                });        

                $('ul#playlist li').click(function() {
                    if ($(this).attr('data-src') === songs[currentTrack].getAttribute('data-src')) {
                        clearInterval(currentTime); //stop timer at current time
                        wavesurfer.playPause(); //Toggle play / pause if clicked on current song
                    }
                    else {
                        var songIndex = $('.song-row').index( this );
                        setCurrentSong(songIndex);
                        wavesurfer.on('ready', function () {
                            wavesurfer.play(); //Play new song when row is clicked
                        });
                    }
                });

                $('#playlist li .right').click(function() {
                    event.stopImmediatePropagation(); //prevents songs from playing when clicking on right menu icon (not an ideal solution but it works)
                    event.preventDefault();
                });

                $('.play-song').click(function() {
                    event.stopImmediatePropagation();
                    if ($(this).closest('li').attr('data-src') === songs[currentTrack].getAttribute('data-src')) {
                        // Toggle play / pause if clicked on the song currently loaded
                        wavesurfer.playPause();
                        clearInterval(currentTime);
                    }
                    else {
                        // Get index of song clicked
                        var songIndex = $('.play-song').index( this );
                        setCurrentSong(songIndex);
                        wavesurfer.on('ready', function () {
                            wavesurfer.play(); // Play new song when button is clicked
                        });
                    }
                });

                wavesurfer.on('finish', function () {
                    setCurrentSong((currentTrack + 1) % songs.length);
                    wavesurfer.on('ready', function () {
                        wavesurfer.play();
                    });
                }); 

                wavesurfer.on('seek', function () {
                    elapsedSeconds = wavesurfer.getCurrentTime();
                    $(window).resize(function() {
                        wavesurfer.empty();
                        wavesurfer.drawBuffer();
                    });
                });
                
                $("#next").click(function() {
                    setCurrentSong((currentTrack + 1) % songs.length);
                }); 

                $("#previous").click(function() {
                    if (currentTrack > 0) {
                        setCurrentSong((currentTrack - 1) % songs.length);
                    }
                    else {
                        setCurrentSong(songs.length - 1);
                    }
                }); 
                
                $("#stop").click(function() {
                    wavesurfer.stop();
                    clearTimer();
                    $('.play-song').addClass('fa-play').removeClass('fa-pause');
                });    
                
                $("#mute").click(function() {
                    mute();
                });
                
                $("#repeat").click(function() {
                    if (isRepeat) {
                        isRepeat = false;
                    }
                    else {
                        isRepeat = true;
                    }
                });

                var setCurrentSong = function (index) {
                    currentTrack = index;

                    if(songs[currentTrack]){
                        wavesurfer.load(songs[currentTrack].getAttribute('data-src'));
                        $(window).resize(function() {
                            wavesurfer.empty();
                            wavesurfer.drawBuffer();
                        });
                    }
                    
                };

                var getTimeString = function(totalSeconds) {
                    function timeToString(num) {
                        return ( num < 10 ? "0" : "" ) + num;
                    }
                
                    hours = Math.floor(totalSeconds / 3600);
                    totalSeconds = totalSeconds % 3600;

                    minutes = Math.floor(totalSeconds / 60);
                    totalSeconds = totalSeconds % 60;

                    seconds = Math.floor(totalSeconds);

                    // Pad the minutes and seconds with leading zeros, if required
                    
                    hours = timeToString(hours);
                    minutes = timeToString(minutes);
                    seconds = timeToString(seconds);

                    // Compose the string for display
                    var currentTimeString = minutes + ":" + seconds;

                    return currentTimeString;
                };

                var showVolume = function(){
                    $('.volume').fadeIn();
                    $('.volume-bar').fadeIn();        
                };

                var hideVolume = function(){
                    if (isDown == false) {
                        $('.volume').fadeOut();
                        $('.volume-bar').fadeOut();        
                    }
                };

                var updateCurrentTime = function() {
                    elapsedSeconds++;
                    $('.current-time').text(getTimeString(elapsedSeconds));            
                };

                var clearTimer = function() {
                    clearInterval(currentTime);
                    $('.current-time').html('00:00');
                    $('.current-song').html('Parado');
                    elapsedSeconds = 0;
                };

                var formatTime = function (time) {
                    return [
                        Math.floor((time % 3600) / 60), // minutes
                        ('00' + Math.floor(time % 60)).slice(-2) // seconds
                    ].join(':');
                };

                setCurrentSong(currentTrack); 
            }
        }
        else{
             window.location.reload(true); 
        }              
    };

    $scope.logout = function(user) {
        $('#logout').on('click', function(){

            client.emit('logout', user, function(message){
                if(message === 'deleted'){
                    $.jStorage.deleteKey('key');                   
                    $scope.$apply($location.path('/login'));
                }
            });
        
        });
    };    
};

/**********************************************
 *
 * FUNÇÕES GERAIS
 * 
**********************************************/

function openChat(user_to, user_from){
        let chat = io.connect('http://localhost:3002/');

        let boxChat = '';
            boxChat += '<div id="container_'+user_from+'" class="box-Chat">';
            boxChat += '  <button id="mini_'+user_from+'">-</button>';
            boxChat += '  <button id="close_'+user_from+'">x</button>';
            boxChat += '  <p><div id="contentChat_'+user_from+'">';
            let recebe = function(array_to, array_from){                  
                for (let prop_to in array_to) {
                    if (array_to.hasOwnProperty(prop_to)) { 
                        
                            $('#contentChat_'+user_from).append(`
                                <div class="from-message">
                                    TEXTO TO
                                    <span>`+array_to[prop_to].Nome+`</span>
                                    <span>`+array_to[prop_to].Username+`</span>
                                    <span>`+array_to[prop_to].Mensagem+`</span>
                                <div>`
                            )
                        
                    }
                }
                for (let prop_from in array_from) {
                    if (array_from.hasOwnProperty(prop_from)) { 

                            $('#contentChat_'+user_from).append(`
                                <div class="to-message">
                                    TEXTO FROM
                                    <span>`+array_from[prop_from].Nome_to+`</span>
                                    <span>`+array_from[prop_from].UsernameFrom+`</span>
                                    <span>`+array_from[prop_from].Mensagem+`</span>
                                <div>`
                            )
                       
                    } 
                }
            }
            boxChat += ' </div></p>';
            boxChat += ' <div id="return_'+user_from+'"></div>';
            boxChat += '  <p><textarea id="keypress_'+user_from+'"></textarea></p>';
            boxChat += '</div>';        
        
        let windowsChat = $('#container_'+user_from); 

        if(windowsChat.length < 1){
            $('body').append(boxChat);            
               
            chat.emit('chat', user_to, user_from, function(message1, eventName){
                recebe(eventName, message1);
            });                                          
        } 
        
        $('#close_'+user_from).click(function(){
            $('#container_'+user_from).remove(); 
            chat.emit('forceDisconnect');
        });
};

function mesagens_usuario(tipo, style, array1, array2, notify){
    tipo = tipo.replace(" ","");
    style = style.replace(" ","");
    let content_message;

    if(tipo === "duplicate_user")
    {
        content_message = `
        <div class="lightbox">
            <div class="content-lightbox">
                <div class="message-lightbox">                            
                    <h3 class="alert-`+style+`">Olá `+array1+`</h3> </ br>

                    <p>Identificamos que o seu login já está sendo usado.</p>
                    <p>Para encerrar o login e efetuar um novo, <button id="fecharToLogin">clique aqui</button> </p>
                    <p>e em seguida tente se logar novamente</p>
                </div>
            </div>
        </div>`;
        $('.lightbox').remove();
        $('body').append(content_message);
    }
    else if(tipo === "fixed")
    {
        content_message = `
        <div class="lightbox">
            <div class="content-lightbox">
                <div class="message-lightbox">                            
                    <h3 class="type-`+style+`"></h3> <button id="fechar">X</button></ br>

                    <p>`+array1+`</p>
                </div>
            </div>
        </div>`;
        $('.lightbox').remove();
        $('body').append(content_message);
    }  
    else if(tipo === "time")
    {
        content_message = `
        <div class="lightbox">
            <div class="content-lightbox">
                <div class="message-lightbox">                            
                    <h3 class="type-`+style+`">`+array1+`</h3></ br>

                    <p>`+array2+`</p>
                </div>
            </div>
        </div>`;
        $('.lightbox').remove();
        $('body').append(content_message)
        $('.lightbox').delay(5000).fadeOut(1000).queue(function() { 
            $(this).remove(); 
        });
    }
    else if(tipo === "indicar")
    {
        if(!array1)
        {
            content_message = `
            <div class="lightbox">
                <div class="content-lightbox">
                    <div class="message-lightbox">
                        <h3 class="type-`+style+`">Eu me indico <button id="fechar">X</button></h3> 
                        <form id="frm_indicar_`+array1+`">
                            <label>
                                E-mail: <br>
                                <input type="email" name="email_indicacao" id="email_indicacao" placeholder="Digite o email para quem deseja indicar" />
                            </label><br>

                            <label>
                                Atividade: <br>
                                <input type="text" placeholder="Busque por Baterista, Guitarrista, etc" id="atividade_indicacao"> </input>
                            </label><br>
                            
                            <label>
                                <button id="btn-indicar"> Enviar </button>
                            </label>

                            <div class="resultado"></div>
                        </form>
                    </div>
                </div>
            </div>`;
        }
        else
        {
            content_message = `
            <div class="lightbox">
                <div class="content-lightbox">
                    <div class="message-lightbox">
                        <h3 class="type-`+style+`">Eu indico o(a): `+array2+` <button id="fechar">X</button></h3> 
                        <form id="frm_indicar_`+array1+`">
                            <label>
                                E-mail: <br>
                                <input type="email" name="email_indicacao" id="email_indicacao" placeholder="Digite o email para quem deseja indicar" />
                            </label><br>

                            <label>
                                Atividade: <br>
                                <input type="text" placeholder="Busque por Baterista, Guitarrista, etc" id="atividade_indicacao"> </input>
                            </label><br>
                            
                            <label>
                                <button id="btn-indicar"> Enviar </button>
                            </label>

                            <div class="resultado"></div>
                        </form>
                    </div>
                </div>
            </div>`;
        }
        
        $('.lightbox').remove();
        $('body').append(content_message);
    }
    else if(tipo === "desfazer")
    {
        content_message = `
        <div class="lightbox">
            <div class="content-lightbox">
                <div class="message-lightbox">                            
                    <h3 class="type-`+style+`"> Alerta <button id="fechar">X</button></h3></ br>
                    
                    Olá `+array1+`
                    <p>Tem certeza que deseja "desfazer amizade" com : `+array2+`</p>
                    <button onclick='funcionalidades(this,\"confirmacaoDesfazerAmizade\",`+array1+`,`+array2+`,\"6\")' class="btnInteraction">desfazer</button>
                    
                </div>
            </div>
        </div>`;
        $('.lightbox').remove();
        $('body').append(content_message);         
    }  

    $('#btn-indicar').on('click', function(){
        $("#frm_indicar_"+array1).validate({ 
            rules: {
                email_indicacao: {
                    required : true,
                    email: true
                },
                atividade_indicacao: {
                    required : true
                },
            },
            messages: {
                email_indicacao: {
                    required: "Preencha o email",
                    email: "Preencha com um email válido"
                },
                atividade_indicacao: {
                    required: "Preencha o atividade"
                },
            },
            submitHandler: function (form) {
                
                var frm_email_indicacao = $('#email_indicacao').val();
                var frm_atividade_indicacao = $('#atividade_indicacao').val(); 

             
                client.emit('indicar', {user_to: array1, user_from: array2, typeNotification: 8, email: frm_email_indicacao, atividade: frm_atividade_indicacao}, function(message1, eventName){

                });                
                
            }    
        });
    });
            
    $('#fechar').click(function(e){
        $('.lightbox').remove();
        e.preventDefault();
    });         
};

function funcionalidades(evento, tipos, user_to, user_from, notificationNumber, idSolicitacao){
    preventButton = function(tipos, user_to, user_from, notificationNumber){
        setTimeout(function(){
            client.emit(tipos, {user_to: user_to, user_from: user_from, typeNotification: notificationNumber, id: idSolicitacao}, function(message1, eventName){
                $(evento).prop('disabled', false);
            });                                
        }, 1000);                                    
    };
    switch (tipos) {
        case 'curtir':
            $(evento).prop('disabled', true);
            preventButton(tipos, user_to, user_from, notificationNumber);
            break;
        case 'seguir':
            $(evento).prop('disabled', true);
            preventButton(tipos, user_to, user_from, notificationNumber);
            break;
        case 'indicar':
            mesagens_usuario(tipos, 'alert', user_to, user_from, notificationNumber);
            break;
        case 'solicitacaoAmizade':
            $(evento).prop('disabled', true);
            preventButton(tipos, user_to, user_from, notificationNumber);
            break;
        case 'aceitaAmizade':
            $(evento).prop('disabled', true);
            preventButton(tipos, user_to, user_from, notificationNumber);    
            break;
        case 'desfazerAmizade':
            $(evento).prop('disabled', true);                                   
            mesagens_usuario('desfazer', 'alert', user_to, user_from, '');
            break;
        case 'confirmacaoDesfazerAmizade':
            $(evento).prop('disabled', true);
            preventButton('desfazerAmizade', user_to, user_from, notificationNumber);
            $('.lightbox').remove();  
            break;                                
        case 'rejeitaAmizade':
            $(evento).prop('disabled', true);
            preventButton(tipos, user_to, user_from, notificationNumber);    
            break;                                
        case 'ouvirRadio':
            alert(user_from);
            break;
        default:
            break;
    };
};
// Create a WaveSurfer instance