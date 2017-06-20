'use strict';
var itensDadosPessoais, itensEndereco, dadosPessoais, endereco, emails, telefones, mSociais, instrumentosQuetoco, estilosQueCurto, fotoPerfi, conteudoDadosPessoais, conteudoEndereco, conteudoEmails, conteudoTelefones, conteudoMSociais, conteudoInstrumentosQuetoco, conteudoEstilosQueCurto, conteudoFotoPerfi, musicaPerfil, musicaPerfilList, conteudoMusicaPerfi, videoPerfil, videoPerfilList, anuncioPerfilList, anuncioPerfilList2, conteudoVideoPerfi, anuncioPerfil, conteudoAnuncioPerfi, datas, separators, tokens, logradouro, validacep, latitude, longitude, url_Parameter, url, valx1, valx2, redirect, selectedValues = [], acoes = {}, contentGeral = [], contentMusica = [], contentVideo = [], contentAnuncio = [];
define(['app'], function (app) {
    app.controller('editarCtrl', function ($scope, $rootScope, $location) {
        $rootScope.loading = true;
        $rootScope.ischecked = true;
        url_Parameter = window.location.pathname;
        url = url_Parameter.substring(url_Parameter.lastIndexOf('/') + 1);
        $rootScope.questionaSessao('editar');
        client.on('editar', function (message) {
            try {
                if (message != '') {
                    itensDadosPessoais = message[0][0];
                    dadosPessoais = "<form id='formGERAL'>";
                    dadosPessoais += "<label> Nome";
                    dadosPessoais += "<input type='text' name='nome' id='nome' value='" + message[0][0].Nome + "' />";
                    dadosPessoais += "</label>";
                    dadosPessoais;
                    dadosPessoais += "<label> Sobrenome";
                    dadosPessoais += "<input type='text' name='sobrenome' id='sobrenome' value='" + message[0][0].Sobrenome + "' />";
                    dadosPessoais += "</label>";
                    dadosPessoais += "<label> Username";
                    dadosPessoais += "<input type='text' name='username' id='username' value='" + message[0][0].Username + "' />";
                    dadosPessoais += "</label>";
                    dadosPessoais += "<label> Senha";
                    dadosPessoais += "<input type='password' name='senha' id='senha' value='" + message[0][0].Senha + "' />";
                    dadosPessoais += "</label>";
                    dadosPessoais;
                    dadosPessoais += "<label> Aniversário";
                    dadosPessoais += "<select name='dia' id='dia'>";
                    dadosPessoais += "<option value='0' selected='1'>Dia</option>";
                    for (var i = 1; i < 32; i++) {
                        dadosPessoais += "<option value=" + i + ">" + i + "</option>";
                    }
                    dadosPessoais += "</select>";
                    dadosPessoais += "<select name='mes' id='mes'>";
                    dadosPessoais += "<option value='0' selected='1'>Mês</option>";
                    for (var i = 1; i < 13; i++) {
                        dadosPessoais += "<option value=" + i + ">" + i + "</option>";
                    }
                    dadosPessoais += "</select>";
                    dadosPessoais += "<select name='ano' id='ano'>";
                    dadosPessoais += "<option value='0' selected='1'>Ano</option>";
                    for (var j = 2010; j > 1911; j--) {
                        dadosPessoais += "<option value=" + j + ">" + j + "</option>";
                    }
                    dadosPessoais += "</select>";
                    dadosPessoais += "</label>";
                    dadosPessoais += "<label> Sexo";
                    if (message[0][0].SexoUser === 1) {
                        dadosPessoais += "<input type='radio' name='sexo' id='masculino' value='1' checked  /> <label for='masculino'> Masculino </label>";
                        dadosPessoais += "<input type='radio' name='sexo' id='feminino' value='2' /> <label for='feminino'> Feminino </label>";
                    }
                    else {
                        dadosPessoais += "<input type='radio' name='sexo' id='masculino' value='1' /> <label for='masculino'> Masculino </label>";
                        dadosPessoais += "<input type='radio' name='sexo' id='feminino' value='2' checked /> <label for='feminino'> Feminino </label>";
                    }
                    dadosPessoais += "</label>";
                    dadosPessoais += "<label> Sobre mim";
                    if (message[0][0].Sobre == null) {
                        dadosPessoais += "<textarea name='sobre' id='sobre'></textarea>";
                    }
                    else {
                        dadosPessoais += "<textarea name='sobre' id='sobre'>" + message[0][0].Sobre + "</textarea>";
                    }
                    dadosPessoais += "</label>";
                    dadosPessoais += "<button id='btnformGERAL'>Salvar</button>";
                    dadosPessoais += "</form>";
                    $.template("PerfilTemplate_1", dadosPessoais);
                    conteudoDadosPessoais = $.tmpl("PerfilTemplate_1", itensDadosPessoais);
                    itensEndereco = message[1][0];
                    endereco = "<form id='formENDERECO'>";
                    endereco += "<label> CEP";
                    endereco += "<input type='text' name='CEP' id='CEP' value='" + message[1][0].CEP + "' onBlur='acoes.metodos.buscaCEP(this.value)' />";
                    endereco += "</label>";
                    endereco += "<label> Logradouro";
                    endereco += "<input type='text' name='logradouro' id='logradouro' value='" + message[1][0].Logradouro + "' />";
                    endereco += "</label>";
                    endereco += "<label> Estado";
                    endereco += "<input type='text' name='estado' id='estado' value='" + message[1][0].Estado + "' />";
                    endereco += "</label>";
                    endereco += "<label> Cidade";
                    endereco += "<input type='text' name='cidade' id='cidade' value='" + message[1][0].Cidade + "' />";
                    endereco += "</label>";
                    endereco += "<label> Regiao <br>";
                    endereco += '<select type="text" name="regiao" id="regiao">';
                    endereco += '<option value="">Selecione a região</option>';
                    endereco += '<option value="região norte">região norte</option>';
                    endereco += '<option value="região sul">região sul</option>';
                    endereco += '<option value="região leste">região leste</option>';
                    endereco += '<option value="região oeste">região oeste</option>';
                    endereco += '<option value="região central">região central</option>';
                    endereco += '</select>';
                    endereco += "</label>";
                    endereco += "<label> Bairro";
                    endereco += "<input type='text' name='bairro' id='bairro' value='" + message[1][0].Bairro + "' />";
                    endereco += "</label>";
                    endereco += "<label> Numero";
                    endereco += "<input type='text' name='numero' id='numero' value='" + message[1][0].Numero + "' onBlur='acoes.metodos.buscaCOORDENADAS(this.value)' />";
                    endereco += "</label>";
                    endereco += "<label> Complemento";
                    endereco += "<input type='text' name='complemento' id='complemento' value='" + message[1][0].Complemento + "' />";
                    endereco += "<input type='hidden' name='latitude' id='latitude' value='" + message[1][0].Latitude + "' />";
                    endereco += "<input type='hidden' name='longitude' id='longitude' value='" + message[1][0].Longitude + "' />";
                    endereco += "</label>";
                    endereco += "<button id='btnformENDERECO'>Salvar</button>";
                    endereco += "</form>";
                    $.template("PerfilTemplate_2", endereco);
                    conteudoEndereco = $.tmpl("PerfilTemplate_2", itensEndereco);
                    $('#regiao option[value="' + message[1][0].Regiao + '"]').prop('selected', true);
                    emails = "<form id='formEMAILS'>";
                    emails += "<button type='button' onclick='acoes.metodos.adiciona(\"formEMAILS\", \"Emails\", \"emails\")'>adicionar</button>";
                    emails += "<button id='btnformEMAILS'>Salvar</button>";
                    emails += "</form>";
                    $.template("PerfilTemplate_3", emails);
                    conteudoEmails = $.tmpl("PerfilTemplate_3");
                    telefones = "<form id='formTELEFONES'>";
                    telefones += "<button type='button' onclick='acoes.metodos.adiciona(\"formTELEFONES\", \"Telefones\", \"telefones\")'>Adicionar</button>";
                    telefones += "<button id='btnformTELEFONES'>Salvar</button>";
                    telefones += "</form>";
                    $.template("PerfilTemplate_4", telefones);
                    conteudoTelefones = $.tmpl("PerfilTemplate_4");
                    mSociais = "<form id='formMIDIASSOCIAIS'>";
                    mSociais += "<button type='button' onclick='acoes.metodos.adiciona(\"formMIDIASSOCIAIS\", \"Midias Sociais\", \"midiasocial\")'>Adicionar</button>";
                    mSociais += "<button id='btnformMIDIASSOCIAIS'>Salvar</button>";
                    mSociais += "</form>";
                    $.template("PerfilTemplate_5", mSociais);
                    conteudoMSociais = $.tmpl("PerfilTemplate_5");
                    instrumentosQuetoco = "<form id='formINSTRUMENTOSTOCO'>";
                    instrumentosQuetoco += "<label> Instrumentos que toco";
                    instrumentosQuetoco += "<select multiple>";
                    instrumentosQuetoco += "</select>";
                    instrumentosQuetoco += "</label>";
                    instrumentosQuetoco += "<button type='button' id='btnformINSTRUMENTOSTOCO'>Salvar</button>";
                    instrumentosQuetoco += "</form>";
                    $.template("PerfilTemplate_6", instrumentosQuetoco);
                    conteudoInstrumentosQuetoco = $.tmpl("PerfilTemplate_6");
                    estilosQueCurto = "<form id='formESTILOSMUSICAIS'>";
                    estilosQueCurto += "<label> Estilos musicas que curto";
                    estilosQueCurto += "<select multiple>";
                    estilosQueCurto += "</select>";
                    estilosQueCurto += "</label>";
                    estilosQueCurto += "<button type='button' id='btnformESTILOSMUSICAIS'>Salvar</button>";
                    estilosQueCurto += "</form>";
                    $.template("PerfilTemplate_7", estilosQueCurto);
                    conteudoEstilosQueCurto = $.tmpl("PerfilTemplate_7");
                    fotoPerfi = '<form id="formFoto" name="formFoto" enctype="multipart/form-data" method="post" onsubmit="return false" >';
                    fotoPerfi += '<input type="hidden" id="pasta" value="' + message[0][0].PastasUsuario + '" />';
                    fotoPerfi += '<input type="file" name="myFile" id="myFile" accept=".png, .jpg, .jpeg"/>';
                    fotoPerfi += '<input type="submit" id="btnformFOTOPERFIL" disabled value="Upload Image" name="submit">';
                    fotoPerfi += '<span id="status"></span>';
                    fotoPerfi += '</form>';
                    $.template("PerfilTemplate_8", fotoPerfi);
                    conteudoFotoPerfi = $.tmpl("PerfilTemplate_8");
                    musicaPerfil = '<form id="formMUSICA" name="formMUSICA" enctype="multipart/form-data" method="post" onsubmit="return false" >';
                    musicaPerfil += '<input type="text" id="pasta1" value="' + message[0][0].PastasUsuario + '" />';
                    musicaPerfil += '<input type="file" name="myFileMusic" id="myFileMusic" accept=".mp3"/>';
                    musicaPerfil += '<input type="submit" id="btnformMUSICA" value="Upload Musica" name="btnformMUSICA">';
                    musicaPerfil += '<span id="statusMusica"></span>';
                    musicaPerfil += '</form>';
                    musicaPerfil += '<div class="ContentMusicas" id="ContentMusicas" style="display: block !important">';
                    musicaPerfil += '<div class="ContentMusicasLista" id="ContentMusicasLista" style="display: block"></div>';
                    musicaPerfil += '</div>';
                    $.template("PerfilTemplate_9", musicaPerfil);
                    conteudoMusicaPerfi = $.tmpl("PerfilTemplate_9");
                    videoPerfil = '<form id="formVIDEO" name="formVIDEO" onsubmit="return false">';
                    videoPerfil += '<input type="text" name="myFileTitle" id="myFileTitle" placeholder="Titulo do video" />';
                    videoPerfil += '<input type="text" name="myFileVideo" id="myFileVideo" placeholder="Embed Youtube" />';
                    videoPerfil += '<input type="submit" id="btnformVIDEO" value="Upload Video" name="submit">';
                    videoPerfil += '<span id="status"></span>';
                    videoPerfil += '</form>';
                    videoPerfil += '<div class="ContentVideos" id="ContentVideos" style="display: block !important">';
                    videoPerfil += '<iframe name="iframe" id="iframe" src="" frameborder="0" allowfullscreen></iframe>';
                    videoPerfil += '<div class="ContentVideosLista" id="ContentVideosLista" style="display: block"></div>';
                    videoPerfil += '</div>';
                    $.template("PerfilTemplate_10", videoPerfil);
                    conteudoVideoPerfi = $.tmpl("PerfilTemplate_10");
                    anuncioPerfil = '<form id="formANUNCIO" name="formANUNCIO" enctype="multipart/form-data" method="post" onsubmit="return false">';
                    anuncioPerfil += '<input type="hidden" id="pastaAnuncios" value="' + message[0][0].PastasUsuario + '" />';
                    anuncioPerfil += '<input type="text" name="tituloAnuncio" id="tituloAnuncio" value="" placeholder="Digite o titulo do anuncio" />';
                    anuncioPerfil += '<textarea name="textoAnuncio" id="textoAnuncio" value="" placeholder="Digite uma descrição do anúncio"></textarea>';
                    anuncioPerfil += '<select type="text" name="tipoAnuncio" id="tipoAnuncio">';
                    anuncioPerfil += '<option value="" class="valid">Selecione o tipo de Anúncio</option>';
                    $.each(message[11], function (key, value) {
                        anuncioPerfil += '<option value="' + value.ID + '">' + value.Anuncios + '</option>';
                    });
                    anuncioPerfil += '</select>';
                    anuncioPerfil += '<select type="text" name="estados" id="estados" class="estados"></select>';
                    anuncioPerfil += '<select type="text" name="cidades" id="cidades" class="cidades"></select>';
                    anuncioPerfil += '<select type="text" name="regiaoAnuncio" id="regiaoAnuncio">';
                    anuncioPerfil += '<option value="">Selecione a região</option>';
                    anuncioPerfil += '<option value="região norte">região norte</option>';
                    anuncioPerfil += '<option value="região sul">região sul</option>';
                    anuncioPerfil += '<option value="região leste">região leste</option>';
                    anuncioPerfil += '<option value="região oeste">região oeste</option>';
                    anuncioPerfil += '<option value="região central">região central</option>';
                    anuncioPerfil += '</select>';
                    anuncioPerfil += '<input type="file" id="myFileAnuncio" name="myFileAnuncio" multiple/>';
                    anuncioPerfil += '<input type="submit" value="Upload Video" name="btnformVIDEO" id="btnformVIDEO">';
                    anuncioPerfil += '<span id="status"></span>';
                    anuncioPerfil += '</form>';
                    anuncioPerfil += '<div class="ContentAnunciosLista" id="ContentAnunciosLista" style="display: block"></div>';
                    $.template("PerfilTemplate_11", anuncioPerfil);
                    conteudoAnuncioPerfi = $.tmpl("PerfilTemplate_11");
                    contentGeral = [conteudoFotoPerfi,
                        conteudoDadosPessoais,
                        conteudoEndereco,
                        conteudoEmails,
                        conteudoTelefones,
                        conteudoMSociais,
                        conteudoInstrumentosQuetoco,
                        conteudoEstilosQueCurto];
                    contentMusica = [conteudoMusicaPerfi];
                    contentVideo = [conteudoVideoPerfi];
                    contentAnuncio = [conteudoAnuncioPerfi];
                    $('#mainGeral').html('Carregando ....');
                    $('#mainGeral').html(contentGeral);
                    $('#mainMusicas').html('Carregando ....');
                    $('#mainMusicas').html(contentMusica);
                    for (var x = 0; x < message[10].length; x++) {
                        musicaPerfilList = "<div id=\"Musica_" + message[10][x].ID + "\" style=\"display: block !important\">\n                                    <a href=\"javascript:;\" rel=\"" + message[10][x].URLMusica + "\"> \n                                        <img src=\"" + message[10][x].Imagem + "\" /> \n                                    </a>\n                                    <input type=\"text\" id=\"titulo\" value=\"" + message[10][x].TituloMusica + "\" placeholder=\"Digite o titulo da musica\" />\n                                    <input type=\"text\" id=\"artista\" value=\"" + message[10][x].Artista + "\" placeholder=\"Digite o Artista\" />\n                                    <input type=\"text\" id=\"genero\" value=\"" + message[10][x].Genero + "\" placeholder=\"Digite o Genero\" />\n                                    <button onclick=\"acoes.metodos.removeMusicas('Musica_" + message[10][x].ID + "', '" + message[10][x].URLMusica + "')\"> Remover </button>\n                                    <button onclick=\"acoes.metodos.updateMusicas('Musica_" + message[10][x].ID + "')\"> Salvar </button>                                    \n                                </div>";
                        $('#ContentMusicasLista').append(musicaPerfilList);
                    }
                    ;
                    $('#mainVideos').html('Carregando ....');
                    $('#mainVideos').html(contentVideo);
                    for (var x = 0; x < message[9].length; x++) {
                        videoPerfilList = "<div id=\"video_" + message[9][x].ID + "\" style=\"display: block !important\">\n                                    <a href=\"https://www.youtube.com/embed/" + message[9][x].URLVideo + "?rel=0&amp;showinfo=0&autoplay=1\" target=\"iframe\"> \n                                        <img src=\"http://img.youtube.com/vi/" + message[9][x].URLVideo + "/default.jpg\" /> \n                                    </a>\n                                    <button onclick=\"acoes.metodos.removeVideos('video_" + message[9][x].ID + "', '" + message[9][x].URLVideo + "')\"> Remover </button>\n                                    <button onclick=\"acoes.metodos.updateVideos('video_" + message[9][x].ID + "')\"> Salvar </button>\n                                    <input type=\"text\" id=\"titulo\" value=\"" + message[9][x].TituloVideo + "\" placeholder=\"Digite o titulo do video\" />\n                                </div>";
                        $('#ContentVideosLista').append(videoPerfilList);
                    }
                    ;
                    $('#mainAnuncios').html('Carregando ....');
                    $('#mainAnuncios').html(contentAnuncio);
                    for (var x = 0; x < message[12].length; x++) {
                        montaEstadoCidade(message[12][x].ID, message[12][x].Estado, message[12][x].Cidade);
                        anuncioPerfilList = "<div id=\"anuncio_" + message[12][x].ID + "\" style=\"display: block !important\">\n                                    \n                                    <img src=\"" + message[12][x].URLs + "\" width=\"100\" /> \n                                   \n                                    <input type=\"text\" id=\"tituloAnuncio\" value=\"" + message[12][x].TitiloAnuncio + "\" placeholder=\"Digite o titulo do anuncio\" />                                   \n                                    <input type=\"text\" id=\"textoAnuncio\" value=\"" + message[12][x].TextoAnuncio + "\" placeholder=\"Digite descri\u00E7\u00E3o do anuncio\" />\n\n                                    <select id=\"tipoAnuncio\"></select>\n                                    \n                                    <select id=\"estados\" class=\"estados_" + message[12][x].ID + "\"></select>\n                                    <select id=\"cidades\" class=\"cidades_" + message[12][x].ID + "\"></select>\n                                    <select id=\"regiaoAnuncio\">\n                                        <option value=\"\">Selecione a regi\u00E3o</option>\n                                        <option value=\"regi\u00E3o norte\">regi\u00E3o norte</option>\n                                        <option value=\"regi\u00E3o sul\">regi\u00E3o sul</option>\n                                        <option value=\"regi\u00E3o leste\">regi\u00E3o leste</option>\n                                        <option value=\"regi\u00E3o oeste\">regi\u00E3o oeste</option>\n                                        <option value=\"regi\u00E3o central\">regi\u00E3o central</option>\n                                    </select>\n\n                                    <label>Data Criac\u00E3o: " + message[12][x].DTAtualizacao + "</label>\n                                    <input type=\"text\" id=\"Criacao\" value=\"" + message[12][x].DTCriacao + "\" />\n                                    <button onclick=\"acoes.metodos.removeAnuncios('anuncio_" + message[12][x].ID + "', '" + message[12][x].URLVideo + "')\"> Remover </button>\n                                    <button onclick=\"acoes.metodos.updateAnuncios('anuncio_" + message[12][x].ID + "')\"> Salvar </button>                                    \n                                </div>";
                        $('#ContentAnunciosLista').append(anuncioPerfilList);
                        $.each(message[11], function (key, value) {
                            $('#anuncio_' + message[12][x].ID + ' #tipoAnuncio').append('<option value="' + value.ID + '">' + value.Anuncios + '</option>');
                        });
                        $('#anuncio_' + message[12][x].ID + ' #tipoAnuncio option[value="' + message[12][x].IDAnuncios + '"]').prop('selected', true);
                        $('#anuncio_' + message[12][x].ID + ' #regiaoAnuncio option[value="' + message[12][x].Regiao + '"]').prop('selected', true);
                    }
                    ;
                    $.each(message[2], function (key, value) {
                        if (value.ID != null) {
                            $('#formEMAILS').append("<label id='emails_" + value.ID + "'> Emails <input type='text' id='emails_" + value.ID + "' name='emails_" + value.ID + "' value='" + value.Emails + "' class='required emails emails_" + value.ID + "' title='Digite um e-mail válido' /> <input type='radio' id='" + value.ID + "' name='principalEmails' value='" + value.Status + "' /> <button type='button' id='emails_" + value.ID + "' onclick='acoes.metodos.remove(this, this.id)'>deletar</button> </label>");
                            if ($('label#emails_' + value.ID + ' input[type="radio"]').val() == '1') {
                                $('label#emails_' + value.ID + ' input[type="radio"]').attr('checked', 'checked');
                            }
                            if ($('label#emails_' + value.ID + ' input[type="text"]').val() == '') {
                                acoes.metodos.remove($('label#emails_' + value.ID + ' input[type="text"]'), 'emails_' + value.ID);
                            }
                        }
                        else {
                            acoes.metodos.adiciona('formEMAILS', 'Emails', 'emails');
                        }
                    });
                    $.each(message[3], function (key, value) {
                        if (value.ID != null) {
                            $('#formTELEFONES').append("<label id='telefones_" + value.ID + "'> Telefones <input type='text' id='telefones_" + value.ID + "' name='telefones_" + value.ID + "' value='" + value.Telefones + "' class='required telefones' title='Campo obrigatório' /> <input type='radio' id='" + value.ID + "' name='principalTelefones' value='" + value.Status + "' /> <button type='button' id='telefones_" + value.ID + "' onclick='acoes.metodos.remove(this, this.id)'>deletar</button> </label>");
                            if ($('label#telefones_' + value.ID + ' input[type="radio"]').val() == '1') {
                                $('label#telefones_' + value.ID + ' input[type="radio"]').attr('checked', 'checked');
                            }
                            if ($('label#telefones_' + value.ID + ' input[type="text"]').val() == '') {
                                acoes.metodos.remove($('label#telefones_' + value.ID + ' input[type="text"]'), 'telefones_' + value.ID);
                            }
                        }
                        else {
                            acoes.metodos.adiciona('formTELEFONES', 'Telefones', 'telefones');
                        }
                    });
                    $.each(message[4], function (key, value) {
                        if (value.ID != null) {
                            $('#formMIDIASSOCIAIS').append("\n                                    <label id='midiasocial_" + value.ID + "'> \n                                        Midias\n                                        <input type='text' name='profile' value='" + value.Profile + "' placeholder='Seu profile' />\n\n                                        <select id='midiasocial_" + value.ID + "' name='midiasocial_" + value.ID + "' class='required' title='Campo obrigat\u00F3rio'>\n                                            <option value=''>Selecione</option>\n                                            <option value='1'>Facebook</option>\n                                            <option value='2'>Google</option>\n                                            <option value='3'>Instagram</option>\n                                        </select>\n                                        \n                                        <button type='button' id='midiasocial_" + value.ID + "' onclick='acoes.metodos.remove(this, this.id)'>deletar</button> \n                                    </label>");
                            $('label#midiasocial_' + value.ID + ' select#midiasocial_' + value.ID + '').val(value.TipoMidiaSocial);
                            if ($('label#midiasocial_' + value.ID + ' input[type="text"]').val() == '') {
                                acoes.metodos.remove($('label#midiasocial_' + value.ID + ' input[type="text"]'), 'midiasocial_' + value.ID);
                            }
                        }
                        else {
                            acoes.metodos.adiciona('formMIDIASSOCIAIS', 'Midias', 'midiasocial');
                        }
                    });
                    $.each(message[6], function (key, value) {
                        $('#formINSTRUMENTOSTOCO select').append('<option value=' + value.ID + '>' + value.Instrumentos + '<option>');
                        $('#formINSTRUMENTOSTOCO select option').filter(function () {
                            return !this.value || $.trim(this.value).length == 0;
                        })
                            .remove();
                        $.each(message[5], function (key, value) {
                            $('#formINSTRUMENTOSTOCO select option[value=' + value.ID + ']').prop('selected', true);
                        });
                    });
                    $.each(message[8], function (key, value) {
                        $('#formESTILOSMUSICAIS select').append('<option value=' + value.ID + '>' + value.EstiloMusical + '<option>');
                        $('#formESTILOSMUSICAIS select option').filter(function () {
                            return !this.value || $.trim(this.value).length == 0;
                        })
                            .remove();
                        $.each(message[7], function (key, value) {
                            $('#formESTILOSMUSICAIS select option[value=' + value.ID + ']').prop('selected', true);
                        });
                    });
                    $.each(message[0], function (key, value) {
                        var d = new Date(value.DTNascimento);
                        var date_d = ("" + d.getDate()).substr(-2);
                        var date_m = ("" + (d.getMonth() + 1)).substr(-2);
                        var date_a = d.getFullYear();
                        $('#formGERAL #dia option[value=' + date_d + ']').prop('selected', true);
                        $('#formGERAL #mes option[value=' + date_m + ']').prop('selected', true);
                        $('#formGERAL #ano option[value=' + date_a + ']').prop('selected', true);
                    });
                    $('#btnformGERAL').click(function () { acoes.metodos.validaAtualizaGERAL(); });
                    $('#btnformENDERECO').click(function () { acoes.metodos.validaAtualizaENDERECO(); });
                    $('#btnformEMAILS').click(function () { acoes.metodos.validaAtualizaEMAILS(); });
                    $('#btnformTELEFONES').click(function () { acoes.metodos.validaAtualizaTELEFONES(); });
                    $('#btnformMIDIASSOCIAIS').click(function () { acoes.metodos.validaAtualizaMIDIASSOCIAIS(); });
                    $('#btnformINSTRUMENTOSTOCO').click(function () { acoes.metodos.validaAtualizaINSTRUMENTOSTOCO(); });
                    $('#btnformESTILOSMUSICAIS').click(function () { acoes.metodos.validaAtualizaESTILOSMUSICAIS(); });
                    $("#username").keyup(function () {
                        var newValue = $(this).val();
                        $(this).val(slugify(newValue));
                    });
                    $('.OpenTabs').on('click', function () {
                        var tab = $(this).attr('rel');
                        switch (tab) {
                            case 'openGeral':
                                $('#usuarioEditar div').hide();
                                $.cookie('cookieTabs', 'mainGeral');
                                $('#mainGeral').show(500);
                                break;
                            case 'openMusicas':
                                $('#usuarioEditar div').hide();
                                $.cookie('cookieTabs', 'mainMusicas');
                                $('#mainMusicas').show(500);
                                break;
                            case 'openVideos':
                                $('#usuarioEditar div').hide();
                                $.cookie('cookieTabs', 'mainVideos');
                                $('#mainVideos').show(500);
                                break;
                            case 'openAnuncios':
                                $('#usuarioEditar div').hide();
                                $.cookie('cookieTabs', 'mainAnuncios');
                                $('#mainAnuncios').show(500);
                                break;
                            default:
                                break;
                        }
                    });
                    $('#ContentVideos a').on('click', function () {
                        var valor = $(this).attr('href');
                        valor = valor.replace('https://www.youtube.com/embed/', '');
                        valor = valor.replace('?rel=0&showinfo=0&autoplay=1', '');
                        $.cookie('video', valor);
                    });
                    if ($.cookie('cookieTabs')) {
                        $('#' + $.cookie('cookieTabs')).show(500);
                    }
                    else {
                        $('#mainGeral').show(500);
                    }
                    redirect = function (newURL) {
                        $scope.$apply($location.path('/editar/' + newURL));
                    };
                }
                else {
                    alert('Acesso negado!');
                    $scope.$apply($location.path('/home'));
                }
                $('#btnformFOTOPERFIL').on('click', function () {
                    var uploadFotoPerfil = document.getElementById('myFile').files[0];
                    var pasta = $('#pasta').val();
                    var pic_size = uploadFotoPerfil.size;
                    acoes.metodos.validaFormFotoPerfil(uploadFotoPerfil);
                    $('#formFoto #status').html('carregando..');
                    if ($('#formFoto').valid()) {
                        if (pic_size >= 10000000) {
                            alert('grande');
                            $('#status').html('');
                            $('#myFile').val('');
                            $('#btnformFOTOPERFIL').prop('disabled', true);
                        }
                        else {
                            client.emit('envia_foto_perfil', { pasta: pasta, imagem: uploadFotoPerfil, userlogado: $.jStorage.get("key") }, function (message, key) { });
                            $('#btnformFOTOPERFIL').prop('disabled', true);
                        }
                    }
                });
                client.on('retornoFile', function (message) {
                    setTimeout(function () {
                        if (message === '1') {
                            alert(message);
                            $('#status').html('');
                            $('#myFile').val('');
                            $('#btnformFOTOPERFIL').prop('disabled', true);
                        }
                        else {
                            $('#status').html('');
                            $('#myFile').val('');
                            $('#btnformFOTOPERFIL').prop('disabled', true);
                            $('#imagePerfil').attr('src', message);
                        }
                    }, 1500);
                });
                $('#myFile').change(function () {
                    $('#btnformFOTOPERFIL').prop('disabled', false);
                });
                $('#btnformMUSICA').on('click', function () {
                    var input = $('#myFileMusic').val();
                    if (input != '') {
                        var form = document.forms.namedItem("formMUSICA");
                        var pasta = $('#pasta1').val();
                        var audio = document.getElementById('myFileMusic').files[0];
                        $('#statusMusica').html('Carregando...');
                        client.emit('envia_audio_perfil', { pasta: pasta, audio: audio, size: audio.size, type: audio.type, userlogado: $.jStorage.get("key") }, function (message) {
                            alert(message);
                        });
                        $('#myFileMusic').val('');
                    }
                    else {
                        console.log('error musica');
                    }
                });
                client.on('retornoFileMusic', function (message) {
                    if (message === 0) {
                        $('#statusMusica').html('');
                        $('#myFileMusic').val('');
                        alert('Audio excede tamanho máximo!!');
                    }
                    else if (message === 1) {
                        alert('Ops!! Erro ao enviar arquivo, tente novamente.');
                    }
                    else {
                        $('#statusMusica').html('');
                        alert('A página será atualizada para efetivar a inclusão');
                        $rootScope.moduloRadio('', 'updade');
                        $('#ContentMusicasLista').append("<div id=\"Musica_" + message[0][0].ID + "\" style=\"display: block !important\">\n                                    <a href=\"javascript:;\" rel=\"" + message[0][0].URLMusica + "\"> \n                                        <img src=\"" + message[0][0].Imagem + "\" /> \n                                    </a>\n                                    <input type=\"text\" id=\"titulo\" value=\"" + message[0][0].TituloMusica + "\" placeholder=\"Digite o titulo da musica\" />\n                                    <input type=\"text\" id=\"artista\" value=\"" + message[0][0].Artista + "\" placeholder=\"Digite o Artista\" />\n                                    <input type=\"text\" id=\"genero\" value=\"" + message[0][0].Genero + "\" placeholder=\"Digite o Genero\" />\n                                    <button onclick=\"acoes.metodos.removeMusicas('Musica_" + message[0][0].ID + "', '" + message[0][0].URLMusica + "')\"> Remover </button>\n                                    <button onclick=\"acoes.metodos.updateMusicas('Musica_" + message[0][0].ID + "')\"> Salvar </button>                                    \n                                </div>");
                    }
                });
                $('#formVIDEO').submit(function (event) {
                    var inputTitle = $('#myFileTitle').val();
                    var inputVideos = $('#myFileVideo').val();
                    inputVideos = inputVideos.split('&')[0];
                    var URLYoutube = inputVideos.substr(0, inputVideos.indexOf("watch"));
                    var URLVideos = inputVideos.substring(inputVideos.lastIndexOf('=') + 1);
                    if (URLYoutube === 'https://www.youtube.com/') {
                        $('#myFileTitle').val('');
                        $('#myFileVideo').val('');
                        client.emit('envia_video_perfil', { title: inputTitle, url: URLVideos, userlogado: $.jStorage.get("key") }, function (message) {
                            if (message[0][0].Retorno == '0') {
                                alert('Este video já existe');
                            }
                            else if (message[0][0].Retorno == '1') {
                                alert('Limite máximo de "20" videos atingido');
                            }
                            else {
                                $('#ContentVideosLista').append("\n                                        <div id=\"video_" + message[0][0].ID + "\" style=\"display: block\">\n                                            <a href=\"https://www.youtube.com/embed/" + message[0][0].URLVideo + "?rel=0&amp;showinfo=0&autoplay=1\" target=\"iframe\"> <img src=\"http://img.youtube.com/vi/" + message[0][0].URLVideo + "/default.jpg\" /> </a>\n                                            <button onclick=\"acoes.metodos.removeVideos('video_" + message[0][0].ID + "', '" + message[0][0].URLVideo + "')\"> Remover</button>\n                                            <button onclick=\"acoes.metodos.updateVideos('video_" + message[0][0].ID + "')\"> Salvar </button>\n                                            <input type=\"text\" id=\"titulo\" value=\"" + message[0][0].TituloVideo + "\" placeholder=\"Digite o titulo do video\" />\n                                        </div>\n                                    ").show();
                            }
                        });
                    }
                    else {
                        if ($('#myFileTitle').val() == '') {
                            alert('o campo deve ser preenchido');
                        }
                        else {
                            alert('Coloque uma url válida!');
                        }
                    }
                    event.preventDefault();
                });
                var uploadAnuncio_1;
                $('#btnformVIDEO').click(function () {
                    uploadAnuncio_1 = document.getElementById('myFileAnuncio').files[0];
                    acoes.metodos.validaFormAnuncio(uploadAnuncio_1);
                    if ($('#formANUNCIO').valid()) {
                        var frm_titulo = $("#tituloAnuncio").val();
                        var frm_textoAnuncio = $("#textoAnuncio").val();
                        var frm_tipoAnuncio = $("#tipoAnuncio").val();
                        var frm_estados = $("#estados").val();
                        var frm_cidades = $("#cidades").val();
                        var frm_regiaoAnuncio = $("#regiaoAnuncio").val();
                        var frm_pasta = $('#pastaAnuncios').val();
                        client.emit('anuncios', {
                            titulo: frm_titulo,
                            tipoAnuncio: frm_tipoAnuncio,
                            estados: frm_estados,
                            cidades: frm_cidades,
                            regiaoAnuncio: frm_regiaoAnuncio,
                            userlogado: $.jStorage.get("key"),
                            textoAnuncio: frm_textoAnuncio,
                            pasta: frm_pasta,
                            inputFile: uploadAnuncio_1
                        }, function (eventName, message, key) {
                            if (eventName === "success") {
                                alert('CONCLUIDO COM SUCESSO!');
                            }
                            else if (eventName === '1') {
                                alert(message);
                            }
                            else {
                                alert('ERRO!');
                            }
                        });
                    }
                });
                client.on('retornoAnuncio', function (message) {
                    if (message == '1') {
                        alert('Limite máximo de "5" anuncios atingido');
                    }
                    else {
                        $('#ContentAnunciosLista').empty();
                        setTimeout(function () {
                            for (var i = 0; i < message[0].length; i++) {
                                montaEstadoCidade(message[0][i].ID, message[0][i].Estado, message[0][i].Cidade);
                                $('#ContentAnunciosLista').append("<div id=\"anuncio_" + message[0][i].ID + "\" style=\"display: block !important\">\n                                        <img src=\"" + message[0][i].URLs + "\" width=\"100\" />                                     \n                                        <input type=\"text\" id=\"tituloAnuncio\" value=\"" + message[0][i].TitiloAnuncio + "\" placeholder=\"Digite o titulo do anuncio\" />\n\n                                        <input type=\"text\" id=\"textoAnuncio\" value=\"" + message[0][i].TextoAnuncio + "\" placeholder=\"Digite descricao do anuncio\" />\n                                                                                \n                                        <select id=\"tipoAnuncio\"></select>\n\n                                        <select id=\"estados\" class=\"estados_" + message[0][i].ID + "\"></select>\n                                        <select id=\"cidades\" class=\"cidades_" + message[0][i].ID + "\"></select>\n                                    \n                                        <select id=\"regiaoAnuncio\">\n                                            <option value=\"\">Selecione a regi\u00E3o</option>\n                                            <option value=\"regi\u00E3o norte\">regi\u00E3o norte</option>\n                                            <option value=\"regi\u00E3o sul\">regi\u00E3o sul</option>\n                                            <option value=\"regi\u00E3o leste\">regi\u00E3o leste</option>\n                                            <option value=\"regi\u00E3o oeste\">regi\u00E3o oeste</option>\n                                            <option value=\"regi\u00E3o central\">regi\u00E3o central</option>\n                                        </select>\n\n                                        <label>data: " + message[0][i].DTAtualizacao + "</label>\n                                        <button onclick=\"acoes.metodos.removeAnuncios('anuncio_" + message[0][i].ID + "', '" + message[0][i].ID + "')\"> Remover </button>\n                                        <button onclick=\"acoes.metodos.updateAnuncios('anuncio_" + message[0][i].ID + "')\"> Salvar </button>                                    \n                                    </div>");
                                $.each(message[1], function (key, value) {
                                    $('#anuncio_' + message[0][i].ID + ' #tipoAnuncio').append('<option value="' + value.ID + '">' + value.Anuncios + '</option>');
                                });
                                $('#anuncio_' + message[0][i].ID + ' #tipoAnuncio option[value="' + message[0][i].IDAnuncios + '"]').prop('selected', true);
                                $('#anuncio_' + message[0][i].ID + ' #regiaoAnuncio option[value="' + message[0][i].Regiao + '"]').prop('selected', true);
                            }
                            ;
                        }, 100);
                    }
                });
                $.getJSON('estados_cidades.json', function (data) {
                    var items = [];
                    var options = '<option value="">Selecione o Estado</option>';
                    $.each(data, function (key, val) {
                        options += '<option value="' + val.sigla + '">' + val.nome + '</option>';
                    });
                    $(".estados").html(options);
                    $(".estados").change(function () {
                        var options_cidades = '';
                        var str = "";
                        $(".estados option:selected").each(function () {
                            str += $(this).text();
                        });
                        options_cidades += '<option value="">Cidades</option>';
                        $.each(data, function (key, val) {
                            if (val.nome == str) {
                                $.each(val.cidades, function (key_city, val_city) {
                                    options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
                                });
                            }
                        });
                        $(".cidades").html(options_cidades);
                    }).change();
                });
                $('#formEMAILS input[type="radio"]').on('click', function () {
                    $('#formEMAILS input[type="radio"]').attr('value', '0');
                    $(this).attr('value', '1').attr('checked', 'checked');
                });
                $('#formTELEFONES input[type="radio"]').on('click', function () {
                    $('#formTELEFONES input[type="radio"]').attr('value', '0');
                    $(this).attr('value', '1').attr('checked', 'checked');
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        client.emit('editar', { userName: url, userlogado: $.jStorage.get("key") }, function (message, key) { });
        $rootScope.loading = false;
    });
});
$.validator.addMethod("regex", function (value, element, regexp) {
    var re = new RegExp(regexp);
    return this.optional(element) || re.test(value);
}, "Verifique a informacao no campo.");
acoes.metodos = {
    adiciona: function (valor, tipo, inputs) {
        var inputsss, resultadoInputs, i, resultado;
        if ($('#' + valor + ' label input[type=text]').length < 3) {
            client.emit('last_id', { data: inputs, userlogado: $.jStorage.get("key") }, function (message, eventName) {
                resultado(inputs, message);
            });
        }
        resultado = function (uniq, tipos) {
            i = uniq + '_' + tipos;
            if (tipos == 'error') {
                alert('preencha o campo antes de adicionar um novo.');
            }
            else if (valor == 'formMIDIASSOCIAIS') {
                if ($('#' + i).length < 1) {
                    $('#' + valor).append("\n                    <label id='" + uniq + '_' + tipos + "'> " + tipo + " \n                        <input type='text' name='profile' placeholder='Seu profile' />\n                        <select id='" + uniq + '_' + tipos + "' name='" + uniq + '_' + tipos + "' class='required " + uniq + "' title='Campo obrigat\u00F3rio'>\n                            <option value=''>Selecione</option>\n                            <option value='1'>Facebook</option>\n                            <option value='2'>Google</option>\n                            <option value='3'>Instagram</option>\n                        </select>\n                    \n                        <button type='button' id='" + uniq + '_' + tipos + "' onclick='acoes.metodos.remove(" + valor + ", this.id)'>deletar</button> \n                    </label>");
                }
            }
            else {
                if ($('#' + i).length < 1) {
                    $('#' + valor).append("\n                    <label id='" + uniq + '_' + tipos + "'> " + tipo + "                   \n                        <input type='text' id='" + uniq + '_' + tipos + "' name='" + uniq + '_' + tipos + "' value='' class='required " + uniq + "' title='Campo obrigat\u00F3rio' />  \n                        <input type='radio' id='" + tipos + "' name='principal" + tipo + "' value='0' /> \n                        <button type='button' id='" + uniq + '_' + tipos + "' onclick='acoes.metodos.remove(" + valor + ", this.id)'>deletar</button> \n                    </label>");
                }
            }
        };
    },
    remove: function (element, id) {
        var e = $(element).closest('form');
        if ($('label#' + id + ' input[type="radio"]').val() == '1') {
            alert('não pode excluir o principal');
        }
        else if ($('#' + e[0].id + ' label input').length == 1) {
            alert('não pode');
        }
        else {
            client.emit('deleta', { id: e[0].id, tipo: id, userlogado: $.jStorage.get("key") }, function (eventName, message, key) { });
            $('#' + e[0].id + ' label#' + id).remove();
        }
    },
    removeVideos: function (value, url) {
        var IDVideo = value.replace('video_', '');
        if ($.cookie('video') == url) {
            $('#ContentVideos iframe').attr('src', '');
        }
        client.emit('deletaVideo', { id: IDVideo, userlogado: $.jStorage.get("key") }, function (message) {
            alert(message);
        });
        $('#ContentVideos #' + value).remove();
    },
    updateVideos: function (value) {
        var IDVideo = value.replace('video_', '');
        var IDTitle = $('#' + value + ' #titulo').val();
        client.emit('updateVideo', { id: IDVideo, title: IDTitle }, function (message) {
            alert(message);
        });
    },
    removeMusicas: function (value, url) {
        var IDMusica = value.replace('Musica_', '');
        client.emit('deletaMusica', { id: IDMusica, userlogado: $.jStorage.get("key") }, function (message) {
            alert(message);
        });
        $('#ContentMusicas #' + value).remove();
    },
    updateMusicas: function (value) {
        var IDMusica = value.replace('Musica_', '');
        var IDTitle = $('#' + value + ' #titulo').val();
        var IDArtista = $('#' + value + ' #artista').val();
        var IDGenero = $('#' + value + ' #genero').val();
        client.emit('updateMusica', { id: IDMusica, title: IDTitle, artista: IDArtista, genero: IDGenero }, function (message) {
            alert(message);
        });
    },
    removeAnuncios: function (value, url) {
        var IDAnuncio = value.replace('anuncio_', '');
        client.emit('deletaAnuncio', { id: IDAnuncio, userlogado: $.jStorage.get("key") }, function (message) {
            alert(message);
        });
        $('#ContentAnunciosLista #' + value).remove();
    },
    updateAnuncios: function (value) {
        var IDAnuncio = value.replace('anuncio_', '');
        var IDTitle = $('#' + value + ' #tituloAnuncio').val();
        var IDTextoAnuncio = $('#' + value + ' #textoAnuncio').val();
        var IDTipoAnuncio = $('#' + value + ' #tipoAnuncio').val();
        var IDEstados = $('#' + value + ' #estados').val();
        var IDCidades = $('#' + value + ' #cidades').val();
        var IDRegiaoAnuncio = $('#' + value + ' #regiaoAnuncio').val();
        client.emit('updateAnuncio', { id: IDAnuncio,
            tituloAnuncio: IDTitle,
            tipoAnuncio: IDTipoAnuncio,
            estados: IDEstados,
            cidades: IDCidades,
            regiaoAnuncio: IDRegiaoAnuncio,
            textoAnuncio: IDTextoAnuncio }, function (message) {
            alert(message);
        });
    },
    validaAtualizaGERAL: function () {
        $("#formGERAL").validate({
            rules: {
                nome: {
                    required: true
                },
                sobrenome: {
                    required: true
                },
                username: {
                    required: true
                },
                senha: {
                    required: true,
                    regex: /^[A-Za-z0-9 ]{5,8}$/
                },
                dia: {
                    required: true
                },
                mes: {
                    required: true
                },
                ano: {
                    required: true
                },
                sexo: {
                    required: true
                }
            },
            messages: {
                nome: {
                    required: "Preencha com seu nome"
                },
                sobrenome: {
                    required: "Preencha seu sobrenome"
                },
                username: {
                    required: "Preencha com seu Username"
                },
                senha: {
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
                }
            },
            submitHandler: function (form) {
                var url_Parameter = window.location.pathname;
                var url = url_Parameter.substring(url_Parameter.lastIndexOf('/') + 1);
                var frm_nome = document.forms["formGERAL"]["nome"].value;
                var frm_sobrenome = document.forms["formGERAL"]["sobrenome"].value;
                var frm_username = document.forms["formGERAL"]["username"].value;
                var frm_senha = document.forms["formGERAL"]["senha"].value;
                var frm_dia = document.forms["formGERAL"]["dia"].value;
                var frm_mes = document.forms["formGERAL"]["mes"].value;
                var frm_ano = document.forms["formGERAL"]["ano"].value;
                var frm_sexo = document.forms["formGERAL"]["sexo"].value;
                var frm_sobre = document.forms["formGERAL"]["sobre"].value;
                var data = frm_dia + '/' + frm_mes + '/' + frm_ano;
                var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
                if (!((data.match(RegExPattern)) && (data != ''))) {
                    alert('Data inválida.');
                    $("#dia").val('');
                    $("#mes").val('');
                    $("#ano").val('');
                }
                else {
                    client.emit('atualiza_geral', {
                        nome: frm_nome,
                        sobrenome: frm_sobrenome,
                        username: frm_username,
                        senha: frm_senha,
                        data: frm_ano + '-' + frm_mes + '-' + frm_dia,
                        sexo: frm_sexo,
                        sobre: frm_sobre,
                        id: $.jStorage.get("key")
                    }, function (eventName, message, key) {
                        if (eventName === "success") {
                            if (url != frm_username) {
                                redirect(frm_username);
                            }
                            alert(message);
                        }
                        else if (eventName === 'error') {
                            alert(message);
                        }
                        else {
                            alert('deu ruim');
                        }
                    });
                }
            }
        });
    },
    validaAtualizaENDERECO: function () {
        var numero = $('#numero').val();
        acoes.metodos.buscaCOORDENADAS(numero);
        $("#formENDERECO").validate({
            rules: {
                CEP: {
                    required: true
                },
                logradouro: {
                    required: true
                },
                estado: {
                    required: true
                },
                cidade: {
                    required: true
                },
                bairro: {
                    required: true
                }
            },
            messages: {
                CEP: {
                    required: "Preencha com seu CEP"
                },
                logradouro: {
                    required: "Preencha seu Endereço"
                },
                estado: {
                    required: "Preencha seu Estado"
                },
                cidade: {
                    required: "Preencha com sua Cidade"
                },
                bairro: {
                    required: "Digite seu Bairro"
                }
            },
            submitHandler: function (form) {
                setTimeout(function () {
                    var frm_CEP = document.forms["formENDERECO"]["CEP"].value;
                    var frm_logradouro = document.forms["formENDERECO"]["logradouro"].value;
                    var frm_estado = document.forms["formENDERECO"]["estado"].value;
                    var frm_cidade = document.forms["formENDERECO"]["cidade"].value;
                    var frm_regiao = document.forms["formENDERECO"]["regiao"].value;
                    var frm_bairro = document.forms["formENDERECO"]["bairro"].value;
                    var frm_numero = document.forms["formENDERECO"]["numero"].value;
                    var frm_complemento = document.forms["formENDERECO"]["complemento"].value;
                    var frm_latitude = document.forms["formENDERECO"]["latitude"].value;
                    var frm_longitude = document.forms["formENDERECO"]["longitude"].value;
                    client.emit('atualiza_endereco', {
                        cep: frm_CEP,
                        logradouro: frm_logradouro,
                        estado: frm_estado,
                        cidade: frm_cidade,
                        regiao: frm_regiao,
                        bairro: frm_bairro,
                        numero: frm_numero,
                        complemento: frm_complemento,
                        latitude: frm_latitude,
                        longitude: frm_longitude,
                        id: $.jStorage.get("key")
                    }, function (eventName, message, key) {
                        if (eventName === "success") {
                            alert(message);
                        }
                        else if (eventName === 'error') {
                            alert(message);
                        }
                        else {
                            alert('deu ruim');
                        }
                    });
                }, 500);
            }
        });
    },
    validaAtualizaEMAILS: function () {
        $.validator.addMethod("emails", function (value, element) {
            return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        });
        $.each($('#formEMAILS input'), function () {
            $("#formEMAILS").validate({
                submitHandler: function (form) {
                    datas = $(form).serialize();
                    datas = datas.replace('%40', '@');
                    separators = ['\\\=', '\\\&'];
                    tokens = datas.split(new RegExp(separators.join('|'), 'g'));
                    var checked = $('#formEMAILS input:checked').attr('id');
                    verificaValorExiste(tokens, $('#formEMAILS input').attr('id'));
                    client.emit('atualiza_emails', { data: tokens, userlogado: $.jStorage.get("key"), idChecked: checked }, function (eventName, message, key) {
                        alert(eventName);
                    });
                }
            });
        });
    },
    validaAtualizaTELEFONES: function () {
        $.each($('#formTELEFONES input'), function () {
            $("#formTELEFONES").validate({
                submitHandler: function (form) {
                    datas = $(form).serialize();
                    separators = ['\\\=', '\\&'];
                    tokens = datas.split(new RegExp(separators.join('|'), 'g'));
                    var checked = $('#formTELEFONES input:checked').attr('id');
                    verificaValorExiste(tokens, $('#formTELEFONES input').attr('id'));
                    client.emit('atualiza_telefones', { data: tokens, userlogado: $.jStorage.get("key"), idChecked: checked }, function (eventName, message, key) {
                        alert(eventName);
                    });
                }
            });
        });
    },
    validaAtualizaMIDIASSOCIAIS: function () {
        var value = $('#formMIDIASSOCIAIS input');
        $.each($('#formMIDIASSOCIAIS input'), function () {
            $("#formMIDIASSOCIAIS").validate({
                submitHandler: function (form) {
                    datas = $(form).serialize();
                    separators = ['\\\=', '\\&'];
                    tokens = datas.split(new RegExp(separators.join('|'), 'g'));
                    var values = value.length;
                    client.emit('atualiza_midiasocial', { data: tokens, userlogado: $.jStorage.get("key"), qtd: values }, function (eventName, message, key) {
                        alert(eventName);
                    });
                }
            });
        });
    },
    validaAtualizaINSTRUMENTOSTOCO: function () {
        $("#formINSTRUMENTOSTOCO :selected").each(function () {
            selectedValues.push($(this).val());
        });
        client.emit('toco', { data: selectedValues, userlogado: $.jStorage.get("key") }, function (eventName, message, key) {
            alert(eventName);
        });
    },
    validaAtualizaESTILOSMUSICAIS: function () {
        $("#formESTILOSMUSICAIS :selected").each(function () {
            selectedValues.push($(this).val());
        });
        client.emit('curto', { data: selectedValues, userlogado: $.jStorage.get("key") }, function (eventName, message, key) {
            alert(eventName);
        });
    },
    validaFormAnuncio: function () {
        var validator = $("#formANUNCIO").validate({
            rules: {
                titulo: {
                    required: true
                },
                tipoAnuncio: {
                    required: true
                },
                estados: {
                    required: true
                },
                cidades: {
                    required: true
                },
                regiaoAnuncio: {
                    required: true
                },
                textoAnuncio: {
                    required: true
                },
                myFileAnuncio: {
                    required: true
                }
            },
            messages: {
                titulo: {
                    required: "PREENCHA O TITULO DO ANÚNCIO"
                },
                tipoAnuncio: {
                    required: "SELECIONE O TIPO DO ANÚNCIO"
                },
                estados: {
                    required: "SELECIONE ESTADO DO ANÚNCIO"
                },
                cidades: {
                    required: "SELECIONE A CIDADE DO ANÚNCIO"
                },
                regiaoAnuncio: {
                    required: "SELECIONE A REGIAO DO ANÚNCIO"
                },
                textoAnuncio: {
                    required: "DIGITE A DESCRICAO DO ANÚNCIO"
                },
                myFileAnuncio: {
                    required: "ESCOLHA UMA IMAGEM PARA O ANÚNCIO"
                },
            },
            submitHandler: function (form) {
                $('#tituloAnuncio').val('');
                $('#tipoAnuncio').val('');
                $('#estados').val('');
                $('#cidades').val('');
                $('#regiaoAnuncio').val('');
                $('#textoAnuncio').val('');
                $('#myFileAnuncio').val('');
                return false;
            }
        });
        $('input[name^="myFileAnuncio"]').rules('add', {
            required: true
        });
    },
    validaFormFotoPerfil: function () {
        var validator = $("#formFoto").validate({
            rules: {
                myFile: {
                    required: true
                }
            },
            messages: {
                myFile: {
                    required: "Digite seu Bairro"
                },
            },
            submitHandler: function (form) {
                $('#myFile').val('');
                return false;
            }
        });
        $('input[name^="myFile"]').rules('add', {
            required: true
        });
    },
    buscaCEP: function (cep) {
        cep = cep.replace(/\D/g, '');
        if (cep != "") {
            validacep = /^[0-9]{8}$/;
            if (validacep.test(cep)) {
                $("#logradouro").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#estado").val("...");
                $.getJSON("//viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
                    if (!("erro" in dados)) {
                        $("#logradouro").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#estado").val(dados.uf);
                        $("#regiao").val("");
                        $("#complemento").val("");
                        $("#numero").val("");
                        $.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + dados.logradouro + "&sensor=false", function (data) {
                            latitude = data.results[0].geometry.location.lat;
                            longitude = data.results[0].geometry.location.lng;
                            $('#latitude').val(latitude);
                            $('#longitude').val(longitude);
                        });
                    }
                    else {
                        $("#CEP").val("");
                        $("#estado").val("");
                        $("#cidade").val("");
                        $("#regiao").val("");
                        $("#bairro").val("");
                        $("#logradouro").val("");
                        $("#numero").val("");
                        $("#complemento").val("");
                    }
                });
            }
            else {
                $("#CEP").val("");
                $("#estado").val("");
                $("#cidade").val("");
                $("#regiao").val("");
                $("#bairro").val("");
                $("#logradouro").val("");
                $("#numero").val("");
                $("#complemento").val("");
            }
        }
        else {
            $("#CEP").val("");
            $("#estado").val("");
            $("#cidade").val("");
            $("#regiao").val("");
            $("#bairro").val("");
            $("#logradouro").val("");
            $("#numero").val("");
            $("#complemento").val("");
        }
    },
    buscaCOORDENADAS: function (value) {
        logradouro = $('#logradouro').val();
        $.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + logradouro + value + "&sensor=false", function (data) {
            latitude = data.results[0].geometry.location.lat;
            longitude = data.results[0].geometry.location.lng;
            $('#latitude').val(latitude);
            $('#longitude').val(longitude);
        });
    },
};
function verificaValorExiste(valor, id) {
    valx1 = valor;
    valx2 = id;
    if (Object.prototype.toString.call(valx1) === '[object Array]') {
        var _loop_1 = function () {
            if (i % 2 === 1) {
                var valores_1 = valx1[i].replace('%40', '@');
                var ids = $('input[value="' + valores_1 + '"]').attr('id');
                client.emit('verificaExistencia', { tipo: valores_1, userlogado: $.jStorage.get("key") }, function (message) {
                    try {
                        if (message[0][0].ID !== 0) {
                            alert('O e-mail ' + valores_1 + ' já existe! ' + message[0][0]['ID']);
                        }
                    }
                    catch (error) {
                        console.log('Nada consta!');
                    }
                });
            }
        };
        for (var i = 0; i < valx1.length; i++) {
            _loop_1();
        }
    }
    else {
        client.emit('verificaExistencia', { tipo: valor, userlogado: $.jStorage.get("key") }, function (message) {
            if (message[0][0]['1'] === 1) {
                alert('celular já existe');
                $(id.selector).val('');
            }
        });
    }
}
;
function slugify(string) {
    return string
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}
;
function montaEstadoCidade(id, estado, cidade) {
    $.getJSON('estados_cidades.json', function (data) {
        var items = [];
        var options = '<option value="">Selecione o Estado</option>';
        $.each(data, function (key, val) {
            options += '<option value="' + val.sigla + '">' + val.nome + '</option>';
        });
        $(".estados_" + id).html(options);
        $(".estados_" + id).change(function () {
            var options_cidades = '';
            var str = "";
            $(".estados_" + id + " option:selected").each(function () {
                str += $(this).text();
            });
            options_cidades += '<option value="">Cidades</option>';
            $.each(data, function (key, val) {
                if (val.nome == str) {
                    $.each(val.cidades, function (key_city, val_city) {
                        options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
                    });
                }
            });
            $(".cidades_" + id).html(options_cidades);
        }).change();
        var options_cidades2;
        var str2;
        $('.estados_' + id + ' option[value=' + estado + ']').attr('selected', 'selected');
        $(".estados_" + id + " option:selected").each(function () {
            str2 += $(this).text();
        });
        options_cidades2 += '<option value="">Cidades</option>';
        $.each(data, function (key, val) {
            str2 = str2.replace("undefined", "");
            if (val.nome == str2) {
                $.each(val.cidades, function (key_city, val_city) {
                    options_cidades2 += '<option value="' + val_city + '">' + val_city + '</option>';
                });
            }
        });
        $(".cidades_" + id).html(options_cidades2);
        $(".cidades_" + id + "  option[value='" + cidade + "']").prop('selected', true);
    });
}
;
$('.telefones').mask("(00) 00000-0000");
$('#celular').mask("(00) 00000-0000");
$('#CEP').mask("00000-000");
//# sourceMappingURL=editar.js.map