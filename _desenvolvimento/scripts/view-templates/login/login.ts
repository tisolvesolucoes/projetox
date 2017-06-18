'use strict'; 

define(['app'], function (app) {
    app.controller('loginCtrl', function ($scope, $rootScope, $location) {

        $rootScope.loading = true;            
            //$rootScope.reload(); //Carrega o header sem cache            
            $rootScope.questionaSessao('login'); //Envia parâmetro do header
        
            $.validator.addMethod(
                "regex",
                function (value, element, regexp) {
                    var re = new RegExp(regexp);
                    return this.optional(element) || re.test(value);
                },
                "Please check your input."
            );

            $("#frmLogin").validate({ 
                rules: {
                    email: {
                        required : true,
                        email: true
                    },
                    senha: {
                        required : true,
                        regex: /^[A-Za-z0-9 ]{5,8}$/
                    },
                },
                messages: {
                    email: {
                        required: "Preencha o email"
                    },
                    senha: {
                        required: "Preencha o senha",
                        regex: "a senha deve conter entre 5 a 8 caracteres"
                    },
                },
                submitHandler: function (form) {
                    
                    var frm_email = document.forms["frmLogin"]["email"].value;
                    var frm_senha = document.forms["frmLogin"]["senha"].value; 

                    client.emit('login', { email: frm_email,senha: frm_senha }, function(tipo, style, array1, array2){
                        $('#email').val('');
                        $('#senha').val('');
                        
                        if(style === "success"){
                            $.jStorage.set("key", array2[0][0].IDSocket);
                            $rootScope.usernameRadio = array2[0][0].Username;
                            $scope.$apply($location.path('/home'));
                        }
                        else if(style === 'confirm'){
                            $rootScope.mesagens_usuario(tipo, style, array1, array2);
                            console.log(array2)                            
                        }
                        else{                            
                            $.jStorage.deleteKey('key');                            
                            $scope.$apply($location.path('/login'));
                            $rootScope.mesagens_usuario(tipo, style, array1, array2); 
                        }
                    });
                    
                }    
            });

            $("#frmCadastrar").validate({ 
                rules: {
                    nome: {
                        required : true
                    },
                    sobrenome: {
                        required : true
                    },
                    celular: {
                        required : true
                    },
                    email_cad: {
                        required : true,
                        email: true
                    },
                    confirmacaoEmail: {
                        required : true,
                        equalTo: "#email_cad"
                    },
                    senha_cad: {
                        required : true,
                        regex: /^[A-Za-z0-9 ]{5,8}$/
                    },
                    dia: {
                        required : true
                    },
                    mes: {
                        required : true
                    },
                    ano: {
                        required : true
                    },
                    sexo: {
                        required : true
                    },                   
                },
                messages: {
                    nome: {
                        required: "Preencha com seu nome"
                    },
                    sobrenome: {
                        required: "Preencha seu sobrenome"
                    },
                    celular: {
                        required: "Preencha com seu celular"
                    },
                    email_cad: {
                        required: "Preencha com seu email"
                    },
                    confirmacaoEmail: {
                        required: "Preencha o email",                        
                        equalTo: "O campo deve ser igual ao email"
                    },
                    senha_cad: {
                        required: "Digite uma senha",
                        regex: "a senha deve conter entre 5 a 8 caracteres"
                    },
                    dia: {
                        required: "Campo obrigatório"
                    },
                    mes: {
                        required: "Campo obrigatório"
                    },
                    ano: {
                        required: "Campo obrigatório"
                    },
                    sexo: {
                        required: "Campo obrigatório"
                    },
                },
                submitHandler: function (form) {

                    let frm_nome = document.forms["frmCadastrar"]["nome"].value;
                    let frm_sobrenome = document.forms["frmCadastrar"]["sobrenome"].value;
                    let frm_celular = document.forms["frmCadastrar"]["celular"].value; 
                    let frm_email_cad = document.forms["frmCadastrar"]["email_cad"].value; 
                    let frm_confirmacaoEmail = document.forms["frmCadastrar"]["confirmacaoEmail"].value; 
                    let frm_senha_cad = document.forms["frmCadastrar"]["senha_cad"].value; 
                    let frm_dia = document.forms["frmCadastrar"]["dia"].value; 
                    let frm_mes = document.forms["frmCadastrar"]["mes"].value; 
                    let frm_ano = document.forms["frmCadastrar"]["ano"].value; 
                    let frm_sexo = document.forms["frmCadastrar"]["sexo"].value; 

                    let frm_data = frm_dia + '/' +frm_mes+ '/' + frm_ano;

                    let RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
                    if (!((frm_data.match(RegExPattern)) && (frm_data!=''))) {
                        alert('Data inválida.');
                        $("#dia").val('');
                        $("#mes").val('');
                        $("#ano").val('');
                    }
                    else
                    {
                        client.emit('cadastrar', { 
                            nome: frm_nome,
                            sobrenome: frm_sobrenome,
                            email: frm_email_cad,
                            celular: frm_celular,
                            dtnascimento: frm_ano+'-'+frm_mes+'-'+frm_dia,
                            sexo: frm_sexo,
                            senha: frm_senha_cad
                        }, function(eventName, message, key){
                            console.log(eventName, message, key)
                            if(eventName === "success"){
                                $.jStorage.set("key", message);
                                //webStorage.setItem('key', message);
                                $scope.$apply($location.path('/home'));
                            }
                            else if(eventName === 'error'){
                                if(key === 1){
                                    $('#email_cad').val('');
                                }
                                else if(key === 2){
                                    $('#celular').val('');
                                }
                                
                                alert(message);
                            }
                            else{
                                $.jStorage.deleteKey('key'); 
                                //webStorage.removeItem('key');
                                $scope.$apply($location.path('/login'));
                            }
                        });
                    }
                }    
            });

            $("#frmRecuperarSenha").validate({ 
                rules: {
                    email_rp: {
                        required : true
                    }
                },
                messages: {
                    email_rp: {
                        required: "Preenchimento obrigatório."
                    },
                },
                submitHandler: function (form) {
                    $('#email_rp').attr('disabled','disabled');
                    
                    var frm_email_rp = document.forms["frmRecuperarSenha"]["email_rp"].value;
                    $('#frmRecuperarSenha').append('<div id="carregando">carregando</div>');

                    client.emit('recuperar_senha', { email: frm_email_rp }, function(eventName, message, key){
                        $('#email_rp').prop('disabled', false);
                        
                        if(eventName === "success"){
                            $('#carregando').remove();
                            alert(message);
                            $scope.$apply($scope.hide = false);
                        }
                        else{
                            $('#carregando').remove();
                            alert("Deu merda")
                        }
                    });
                    
                }    
            });

            $('#celular').mask("(00) 00000-0000");
            $rootScope.ischecked = false;
        $rootScope.loading = false;
    });
});