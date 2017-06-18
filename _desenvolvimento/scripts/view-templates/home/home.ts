'use strict'; 

define(['app'], function (app) {
    app.controller('HomeCtrl', function ($scope, $rootScope) {
        
        $rootScope.loading = true;
            $rootScope.ischecked = true;            
            /**********************************************
             *
             * $rootScope.reload(); // Carrega o header sem cache
             * 
            **********************************************/
            $rootScope.questionaSessao('home'); 
            //ENVIA PARÊMETRO DA PÁGINA ATUAL PARA O HEADER
       
            client.on('home', function(message){
                var itensMenu = message;
                //console.log(message)
                var markupHome =  "<li id=box_${Username}>"           
                    markupHome +=   "<a href=perfil/${Username}>";
                    markupHome +=       "<img src=${Imagem} width='100' />";
                    markupHome +=       "${Nome}";
                    markupHome +=   "<span id='status_${Username}'></span>";
                    markupHome +=   "</a>";
                    markupHome +=   "<br> <div style='color: white; font-size: 18px;' class='amizade'> ${Amigo} </div> <br>";
                    markupHome +=   "<div class='status_${Username}'> 0 </div>";                       
                    markupHome +=   "<p> <button onclick='funcionalidades(this,\"curtir\","+$rootScope.username+",${Username},\"3\")' class='btnInteraction'>curtir</button> <span class='curtir_${Username}' style='display: inline-block'> 0 </span></p>";
                    markupHome +=   "<p> <button onclick='funcionalidades(this,\"seguir\","+$rootScope.username+",${Username},\"4\")' class='btnInteraction btn-seguir'>seguir</button> <span class='seguir_${Username}' style='display: inline-block'> 0 </span></p>";
                    markupHome +=   "<p> <button onclick='funcionalidades(this,\"indicar\","+$rootScope.username+",${Username},\"8\")' class='btnInteraction btn-indicar'>indicar como</button>  </p>";
                    markupHome +=   "{{if Amigo == '1'}}"+
                        "<p> <div class='btnBotao_${Username}'> <button onclick='funcionalidades(this,\"desfazerAmizade\","+$rootScope.username+",${Username},\"6\")' class='btnInteraction btn-desfazeramizade'>desfazer amizade</button> </div> </p>"+
                    "{{else}}"+
                        "<p> <div class='btnBotao_${Username}'> <button onclick='funcionalidades(this,\"solicitacaoAmizade\","+$rootScope.username+",${Username},\"2\")' class='btnInteraction btn-solicitacao'>solicitação amizade</button> </div> </p>"+
                    "{{/if}}";
                    markupHome +=   "<p> <button onclick='funcionalidades(this,\"ouvirRadio\","+$rootScope.username+",${Username},\"7\")' class='btnInteraction'>Rádio</button>  </p>";                                      
                    markupHome +=   "<p> Toca </p>";
                    markupHome +=   "<p> Curte </p>";
                    markupHome +=   "{{if Status == '1'}}"+
                        "<p> <button onclick='openChat(\"msn-mensagemUsuario\", "+$rootScope.username+", ${Username})'>chat</button> </p>"+
                        "<p> <button onclick='funcionalidades(this,\"email\","+$rootScope.username+",${Username})' class='btnInteraction'>Email</button>  </p>"+
                    "{{else}}"+
                        "<p> <button onclick='funcionalidades(this,\"Email\","+$rootScope.username+",${Username})' class='btnInteraction'>Email</button>  </p>"+
                    "{{/if}}"; 
                    markupHome += "</li>";
                                    
                $.template("HomeTemplate", markupHome);
                let conteudo = $.tmpl("HomeTemplate", itensMenu);
                $(".usuarios").html(conteudo);                  
            });
            

            client.emit('home', {userlogado:$.jStorage.get("key"), quantidade:20}, function(message, key){});            
        $rootScope.loading = false;
    });
});
