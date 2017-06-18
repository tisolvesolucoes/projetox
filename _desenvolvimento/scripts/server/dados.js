var conn = require('./connect');
var nodemailer = require('nodemailer');
var mkdirp = require('mkdirp');
var del = require('delete');
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'fabio.nsousa1@gmail.com',
        pass: 'fEf7539510'
    }
};
var transporter = nodemailer.createTransport(smtpConfig);
var notificacoes = function (Emit, Tipo, IDuser1, IDuser2) {
    conn.app_pertube.query('CALL NOTIFICACOES("' + Tipo + '","' + IDuser1 + '","' + IDuser2 + '")', function (_err, result, _fields) {
        Emit.emit('notificacoes', result);
    });
};
var notificacoes_user = function (Emit, array) {
    this.idtoken = array;
    conn.app_pertube.query("\n        select distinct\n            (select Nome from usuarios where id = a.IDUsuarioEnvia) as NomeTo,\n            (select Username from usuarios where id = a.IDUsuarioEnvia) as UsernameTo,\n            (select IDSocket from auth where IDUsuarios = a.IDUsuarioEnvia) as SocketTo,\n            b.IDUsername,\n            b.IDSocket,\n            c.TipoNotificacoes,\n            c.ID,\n            d.Nome\n        from \n            notificacoes_usuarios a\n        left join auth b on\n            b.IDUsuarios = a.IDUsuarioRecebe\n        left join tipos_notificacoes c on\n            c.ID = a.IDTIpoNotificacao\n        left join usuarios d on\n            d.ID = b.IDUsuarios\n        where\n            b.IDSocket = \"" + this.idtoken + "\"", function (_err, result, _fields) {
        Emit.emit('notificacoes', result);
    });
};
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
var criarSessao = function (valor, array, callback) {
    this.email = array.email;
    this.senha = array.senha;
    conn.app_pertube.query('CALL Login("' + this.email + '","' + this.senha + '")', function (err, result, _fields) {
        try {
            if (result[0][0] && result[0][0].IDUsuarios) {
                callback('duplicate_user', 'confirm', result[0][0].Nome, result[0][0].IDSocket);
            }
            else {
                conn.app_pertube.query('CALL Auth("' + result[0][0].ID + '","' + valor.id + '","' + result[0][0].Username + '","' + currentdate + '")', function (err, result3, _fields) {
                    callback('', 'success', '', result3);
                });
            }
        }
        catch (error) {
            callback('time ', 'warning', 'Informação do sistema!', 'Usuário ou senha incorretos!');
        }
    });
};
var atualiza_geral = function (valor, array, callback) {
    this.nome = array.nome;
    this.sobrenome = array.sobrenome;
    this.username = array.username;
    this.senha = array.senha;
    this.data = array.data;
    this.sexo = array.sexo;
    this.sobre = array.sobre;
    this.id = array.id;
    conn.app_pertube.query("CALL ATUALIZA_FRM_GERAL(\n        \"" + this.nome + "\",\n        \"" + this.sobrenome + "\",\n        \"" + this.username + "\",  \n        \"" + this.senha + "\",\n        \"" + this.data + "\",\n        \"" + this.sexo + "\",\n        \"" + this.sobre + "\",\n        \"" + this.id + "\")", function (err, result, _fields) {
        try {
            if (result[0][0].error === 0) {
                callback('error', 'Username já existe.');
            }
            else {
                callback('success', 'Atualização realizada com sucesso');
            }
        }
        catch (error) {
            console.log(error);
        }
    });
};
var atualiza_endereco = function (valor, array, callback) {
    this.cep = array.cep;
    this.logradouro = array.logradouro;
    this.estado = array.estado;
    this.cidade = array.cidade;
    this.regiao = array.regiao;
    this.bairro = array.bairro;
    this.numero = array.numero;
    this.complemento = array.complemento;
    this.latitude = array.latitude;
    this.longitude = array.longitude;
    this.id = array.id;
    conn.app_pertube.query("CALL ATUALIZA_FRM_ENDERECO(\n        \"" + this.cep + "\",\n        \"" + this.logradouro + "\",\n        \"" + this.estado + "\",        \n        \"" + this.cidade + "\",\n        \"" + this.regiao + "\",\n        \"" + this.bairro + "\",\n        \"" + this.numero + "\",\n        \"" + this.complemento + "\",\n        \"" + this.latitude + "\",\n        \"" + this.longitude + "\",\n        \"" + this.id + "\")", function (err, result, _fields) {
        try {
            callback('success', 'Atualização realizada com sucesso');
        }
        catch (error) {
            console.log('error');
            callback('error', error);
        }
    });
};
var atualiza_emails = function (_valor, array, callback) {
    var separator = array.data;
    var array1 = [];
    var array2 = [];
    var columns, rows, resultado1, resultado2;
    var grava = function (val2, val3) {
        val3 = val3.replace('%40', '@');
        conn.app_pertube.query("SELECT IDUsuarios FROM auth WHERE IDSocket = \"" + array.userlogado + "\"", function (err, result, _fields) {
            conn.app_pertube.query("CALL EMAILS(" + result[0].IDUsuarios + ", " + val2 + ", \"" + val3 + "\", \"" + array.idChecked + "\")", function (err, _result20, _fields) {
                try {
                    callback('Dados salvos com sucesso!');
                }
                catch (error) {
                    console.log('error');
                }
            });
        });
    };
    for (var i = 0; i < separator.length; i++) {
        if (i % 2 === 0) {
            separator[i] = separator[i].replace('emails_', '');
            array1.push(separator[i]);
        }
        if (i % 2 === 1) {
            array2.push(separator[i]);
        }
    }
    ;
    columns = array1;
    rows = [array2];
    for (var y = 0; y < rows.length; y++) {
        for (var i = 0; i < columns.length; i++) {
            resultado1 = columns[i];
            resultado2 = rows[y][i];
            grava(resultado1, resultado2);
        }
    }
    ;
};
var atualiza_telefones = function (_valor, array, callback) {
    var separator = array.data;
    var array1 = [];
    var array2 = [];
    var columns, rows, resultado1, resultado2;
    var grava = function (val2, val3) {
        val3 = val3.replace('+', ' ');
        conn.app_pertube.query("SELECT IDUsuarios FROM auth WHERE IDSocket = \"" + array.userlogado + "\"", function (_err, result, _fields) {
            conn.app_pertube.query("CALL TELEFONES(" + result[0].IDUsuarios + ", \"" + val2 + "\", \"" + val3 + "\", \"" + array.idChecked + "\")", function (err, _result, _fields) {
                try {
                    callback('Dados salvos com sucesso!');
                }
                catch (error) {
                    console.log('error');
                }
            });
        });
    };
    for (var i = 0; i < separator.length; i++) {
        if (i % 2 === 0) {
            separator[i] = separator[i].replace('telefones_', '');
            array1.push(separator[i]);
        }
        if (i % 2 === 1) {
            array2.push(separator[i]);
        }
    }
    ;
    columns = array1;
    rows = [array2];
    for (var y = 0; y < rows.length; y++) {
        for (var i = 0; i < columns.length; i++) {
            resultado1 = columns[i];
            resultado2 = rows[y][i];
            grava(resultado1, resultado2);
        }
    }
    ;
};
var atualiza_midiasocial = function (_valor, array, callback) {
    var separator = array.data;
    var array1 = [];
    var array2 = [];
    var quantidade = array.qtd;
    var resultado10 = [];
    var columns, rows, resultado1, resultado2;
    for (var i = 0; i < quantidade; i++) {
        for (var x = 0; x < separator.length; x++) {
            if (x % 2 === 0) {
                separator[x] = separator[x].replace('midiasocial_', '');
                array2.push(separator[x]);
            }
            if (x % 2 === 1) {
                array2.push(separator[x]);
            }
        }
        ;
    }
    ;
    var grava = function (val2, val3, val4) {
        conn.app_pertube.query("SELECT IDUsuarios FROM auth WHERE IDSocket = \"" + array.userlogado + "\"", function (_err, result, _fields) {
            conn.app_pertube.query("CALL MIDIASOCIAL(" + result[0].IDUsuarios + ", \"" + val2 + "\", " + val3 + ", " + val4 + ")", function (err, results, _fields) {
                try {
                    callback('Dados salvos com sucesso!');
                }
                catch (error) {
                    console.log('error', err);
                }
            });
        });
    };
    rows = array2;
    var chunk, davi, fabio, kelly;
    var createGroupedArray = function (arr, chunkSize, qtds) {
        var i;
        for (i = 0; i < arr.length; i += chunkSize) {
            while (arr.length > qtds) {
                chunk = arr.splice(0, 4);
                davi = chunk.splice(1, 1);
                fabio = chunk.splice(1, 1);
                kelly = chunk.splice(1, 1);
                grava(davi, fabio, kelly);
            }
        }
    };
    var groupedArr = createGroupedArray(rows, 2, quantidade);
};
var toco = function (_valor, array, callback) {
    conn.app_pertube.query("SELECT IDUsuarios FROM auth WHERE IDSocket = \"" + array.userlogado + "\"", function (_err, result, _fields) {
        conn.app_pertube.query("DELETE FROM toco WHERE IDUsuarios = " + result[0].IDUsuarios + "", function (err, result, fields) {
            for (var i = 0; i < array.data.length; i++) {
                conn.app_pertube.query("CALL TOCO(\"" + array.userlogado + "\", \"" + array.data[i] + "\")", function (err, _result, _fields) {
                    try {
                        callback('Dados salvos com sucesso!');
                    }
                    catch (error) {
                        console.log('error');
                    }
                });
            }
        });
    });
};
var curto = function (_valor, array, callback) {
    conn.app_pertube.query("SELECT IDUsuarios FROM auth WHERE IDSocket = \"" + array.userlogado + "\"", function (_err, result, _fields) {
        conn.app_pertube.query("DELETE FROM curto WHERE IDUsuarios = " + result[0].IDUsuarios + "", function (err, result, fields) {
            for (var i = 0; i < array.data.length; i++) {
                conn.app_pertube.query("CALL CURTO(\"" + array.userlogado + "\", \"" + array.data[i] + "\")", function (err, _result, _fields) {
                    try {
                        callback('Dados salvos com sucesso!');
                    }
                    catch (error) {
                        console.log('error');
                    }
                });
            }
        });
    });
};
var deletar = function (_valor, array, _callback) {
    var separators = ['\\\emails_', '\\\telefones_', '\\\midiasocial_'];
    var tokens = array.tipo.split(new RegExp(separators.join('|'), 'g'));
    var tipo = array.id.replace('form', '').toLowerCase();
    var uniqueArray = tokens.filter(function (elem, pos) {
        return tokens.indexOf(elem) == pos;
    });
    for (var key in uniqueArray) {
        if (uniqueArray.hasOwnProperty(key)) {
            var obj = uniqueArray[key];
            obj = obj.replace('telefones_', '');
            obj = obj.replace('midiasocial_', '');
            if (tipo == 'midiassociais') {
                tipo = 'midia_social';
            }
            conn.app_pertube.query("SELECT IDUsuarios FROM auth WHERE IDSocket = \"" + array.userlogado + "\"", function (_err, result, _fields) {
                conn.app_pertube.query("DELETE FROM " + tipo + " WHERE ID = " + obj + " AND IDUsuarios = " + result[0].IDUsuarios + "", function (_err, _result, _fields) {
                    try {
                    }
                    catch (error) {
                        console.log('error');
                    }
                });
            });
        }
    }
};
var last_id = function (_valor, array, callback) {
    try {
        switch (array.data) {
            case 'emails':
                conn.app_pertube.query('CALL LASTID_EMAILS("' + array.userlogado + '")', function (err, result, _fields) {
                    try {
                        callback(result[0][0].ID, result[0][0].Adicionar);
                    }
                    catch (error) {
                        callback('error');
                    }
                });
                break;
            case 'telefones':
                conn.app_pertube.query('CALL LASTID_TELEFONES("' + array.userlogado + '")', function (err, result, _fields) {
                    try {
                        callback(result[0][0].ID, result[0][0].Adicionar);
                    }
                    catch (error) {
                        callback('error');
                    }
                });
                break;
            case 'midiasocial':
                conn.app_pertube.query('CALL LASTID_MIDIASOCIAL("' + array.userlogado + '")', function (err, result, _fields) {
                    try {
                        callback(result[0][0].ID, result[0][0].Adicionar);
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
                break;
            default:
                break;
        }
    }
    catch (error) {
        console.log(error);
    }
};
var recuperar_senha = function (array, callback) {
    this.email = array.email;
    var code_rp = Math.floor((Math.random() * 100) + 4000);
    var url_rp = Math.floor((Math.random() * 10004) + 405080);
    var mailOptions = {
        from: '"Role de Hoje 👥" <fabio.nsousa1@gmail.com>',
        to: this.email,
        subject: 'Recuperar de senha ✔',
        text: 'Olá 🐴',
        html: '<p>Para recuperar o acesso ao site, acesse este link http://localhost:3001/appPertube/mudarSenha/' + url_rp + ' <br> Digite a senha:"' + code_rp + '"</p>'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callback("time", "error", "Deu ruim");
            return console.log(error);
        }
        else {
            conn.app_pertube.query('CALL RECUPERASENHA("' + this.email + '","' + code_rp + '","' + url_rp + '")', function (_err, result1, _fields) {
                if (result1[0][0] && result1[0][0].Email) {
                    callback("time", "success", "Enviando seu e-mail");
                }
                else {
                    callback("time", "error", "Email não existe no sistema");
                }
            });
        }
    });
};
var selecionarSessao = function (valor, array) {
    this.idtoken = array;
    conn.app_pertube.query('CALL Session("' + this.idtoken + '")', function (_err, result, _fields) {
        try {
            if (result[0][0] && result[0][0].IDSocket) {
                valor.emit('header', result);
            }
            else {
                valor.emit('header', '0');
            }
        }
        catch (error) {
            console.log('error');
        }
    });
};
var cadastro = function (valor, array, callback) {
    conn.app_pertube.query("\n        CALL Cadastrar(\"" + array.nome + "\",\n            \"" + array.sobrenome + "\",\n            \"" + array.email + "\",\n            \"" + array.celular + "\",\n            \"" + array.dtnascimento + "\",\n            \"" + array.sexo + "\",\n            \"" + array.senha + "\")", function (err, result0, _fields) {
        try {
            if (result0[0][0].error === 0) {
                callback('error', 'Username já existe', '0');
            }
            else if (result0[0][0].error === 1) {
                callback('error', 'E-mail já existe', '1');
            }
            else if (result0[0][0].error === 2) {
                callback('error', 'Telefone já existe', '2');
            }
            else {
                try {
                    conn.app_pertube.query('CALL Auth("' + result0[0][0].ID + '","' + valor.id + '","' + result0[0][0].Username + '","' + currentdate + '")', function (err, result3, _fields) {
                        mkdirp('content/images/' + result3[0][0].PastasUsuario + '', function (err) {
                            if (err)
                                console.error(err);
                        });
                        mkdirp('content/images/' + result3[0][0].PastasUsuario + '/original', function (err) {
                            if (err)
                                console.error(err);
                        });
                        mkdirp('content/images/' + result3[0][0].PastasUsuario + '/big', function (err) {
                            if (err)
                                console.error(err);
                        });
                        mkdirp('content/images/' + result3[0][0].PastasUsuario + '/thumbs', function (err) {
                            if (err)
                                console.error(err);
                        });
                        mkdirp('content/sounds/' + result3[0][0].PastasUsuario, function (err) {
                            if (err)
                                console.error(err);
                        });
                        callback('success', valor.id);
                    });
                }
                catch (error) {
                    callback('error', 'Não foi possível efetur o login.');
                }
            }
        }
        catch (error) {
            callback('error', 'Não foi possível efetur o login.');
        }
    });
};
var pages = function (valor, page, array) {
    this.user = array.userName;
    this.token = array.userlogado;
    this.quantidade = array.quantidade;
    this.pages = page;
    switch (this.pages) {
        case "pageHome":
            conn.app_pertube.query('CALL home("' + this.token + '", ' + this.quantidade + ')', function (_err, result, _fields) {
                try {
                    valor.emit('home', result[0]);
                }
                catch (error) {
                    console.log('error');
                }
            });
            break;
        case "pagePerfil":
            conn.app_pertube.query('CALL perfil("' + this.user + '")', function (_err, result, _fields) {
                try {
                    valor.emit('perfil', result);
                }
                catch (error) {
                    console.log('error');
                }
            });
            break;
        case "pageEditar":
            conn.app_pertube.query('CALL editar("' + this.user + '","' + this.token + '")', function (_err, result, _fields) {
                try {
                    valor.emit('editar', result);
                }
                catch (error) {
                    console.log('error');
                }
            });
            break;
        default:
            break;
    }
};
var mostra_status = function (valor) {
    this.mudar_status = function (array) {
        this.usuario = array.usuario;
        this.valor = array.valor;
        conn.app_pertube.query('CALL MUDARSTATUS("' + this.usuario + '", "' + this.valor + '")', function (_err, _result, _fields) {
            conn.app_pertube.query("select \n                                a.IDSocket, \n                                a.IDUsername, \n                                a.Status,\n                                b.Username \n                            from \n                                auth a\n                            right join usuarios b on\n                                b.ID = a.IDUsuarios", function (_err, result2, _fields) {
                valor.emit('mostra_status', result2);
            });
        });
    };
    conn.app_pertube.query("select \n                                a.IDSocket, \n                                a.IDUsername, \n                                a.Status,\n                                b.Username \n                            from \n                                auth a\n                            right join usuarios b on\n                                b.ID = a.IDUsuarios", function (_err, result, _fields) {
        valor.emit('mostra_status', result);
    });
};
var interacao = function (valor, tipo, to, from, typeNotif, parameter1, parameter2) {
    var notify;
    this.to_interacao = to;
    this.from_interacao = from;
    this.typeNotif_interacao = typeNotif;
    conn.app_pertube.query("\n        \n        select ID from usuarios where USERNAME = \"" + this.to_interacao + "\"\n        union all\n        select ID from usuarios where USERNAME = \"" + this.from_interacao + "\"", function (_err, result1, _fields) {
        try {
            conn.app_pertube.query('CALL ' + tipo + '("' + typeNotif + '","' + result1[0].ID + '","' + result1[1].ID + '")', function (_err, result, _fields) {
                switch (tipo) {
                    case 'CURTIR':
                        conn.app_pertube.query("\n                            SELECT \n                                b.Username,\n                                c.IDSocket,\n                                IFNULL(SUM(a.Curtir),0) AS Total\n                            FROM \n                                curtir a \n                            right join usuarios b on \n                                b.ID = a.IDUsuarioRecebe\n                            left join auth c on \n                                c.IDUsuarios = b.ID  \n                            group by b.Username", function (_err, result4, _fields) {
                            if (result[0][0] != null) {
                                notificacoes(valor, 3, result1[0].ID, result1[1].ID);
                                valor.emit('recebe_curtir', result4);
                                valor.emit('notificacoes', result4);
                            }
                            else {
                                valor.emit('recebe_curtir', result4);
                                valor.emit('notificacoes', result4);
                            }
                        });
                        break;
                    case 'SEGUIR':
                        conn.app_pertube.query("\n                            SELECT \n                                b.Username,\n                                c.IDSocket,\n                                IFNULL(SUM(a.Seguir),0) AS Total\n                            FROM \n                                seguir a \n                            right join usuarios b on \n                                b.ID = a.IDUsuarioRecebe\n                            left join auth c on \n                                c.IDUsuarios = b.ID \n                            group by b.Username", function (_err, result4, _fields) {
                            if (result[0][0] != null) {
                                notificacoes(valor, 4, result1[0].ID, result1[1].ID);
                                valor.emit('recebe_seguir', result4);
                                valor.emit('notificacoes', result4);
                            }
                            else {
                                valor.emit('recebe_seguir', result4);
                                valor.emit('notificacoes', result4);
                            }
                        });
                        break;
                    case 'SOLICITACAOMIZADE':
                        try {
                            if (result[0].resultado) {
                                console.log('Vocês já são amigos');
                            }
                            else {
                                notificacoes(valor, 1, result1[0].ID, result1[1].ID);
                                valor.emit('solicitacaoAmizade', result);
                            }
                        }
                        catch (error) {
                            console.log('error');
                        }
                        break;
                    case 'ACEITAAMIZADE':
                        try {
                            if (result == '1') {
                                console.log('Vocês já são amigos');
                            }
                            else {
                                notificacoes(valor, 2, result1[0].ID, result1[1].ID);
                                conn.app_pertube.query("\n                                select \n                                    a.IDSocket,\n                                    a.IDUsername,\n                                    " + parameter1 + " as ID\n                                from\n                                    auth a\n                                where\n                                    a.IDUsuarios = " + result1[0].ID + "\n                                or\n                                    a.IDUsuarios = " + result1[1].ID + "", function (_err, resultAceite, _fields) {
                                    valor.emit('recebe_aceiteAmizade', resultAceite);
                                });
                            }
                        }
                        catch (error) {
                            console.log('error');
                        }
                        break;
                    case 'REJEITAAMIZADE':
                        try {
                            notificacoes(valor, 5, result1[0].ID, result1[1].ID);
                            conn.app_pertube.query("\n                            select \n                                a.IDSocket,\n                                a.IDUsername,\n                                " + parameter1 + " as ID \n                            from\n                                auth a\n                            where\n                                a.IDUsuarios = " + result1[0].ID + "\n                            or\n                                a.IDUsuarios = " + result1[1].ID + "", function (_err, resultRejeito, _fields) {
                                valor.emit('recebe_rejeitarAmizade', resultRejeito);
                            });
                        }
                        catch (error) {
                            console.log('error');
                        }
                        break;
                    case 'DESFAZERAMIZADE':
                        try {
                            valor.emit('recebe_desfazerAmizade', result);
                        }
                        catch (error) {
                            console.log('error');
                        }
                        break;
                    case 'INDICAR':
                        notify = typeNotif;
                        conn.app_pertube.query('CALL INDICAR("' + result1[0].ID + '", "' + result1[1].ID + '", ' + notify + ', "' + parameter1 + '", "' + parameter2 + '")', function (_err, result50, _fields) {
                            try {
                                valor.emit('recebe_indicacao', result50);
                            }
                            catch (error) {
                                console.log('error');
                            }
                        });
                        break;
                    case 'ouvirRadio':
                        break;
                    case 'openChat':
                        break;
                    case 'email':
                        break;
                    default:
                        break;
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
var verificaExistencia = function (valor, callback) {
    conn.app_pertube.query('CALL VERIFICAEXISTENTES("' + valor.tipo + '", "' + valor.userlogado + '")', function (_err, result, _fields) {
        callback(result);
    });
};
module.exports.selecionarSessao = selecionarSessao;
module.exports.cadastro = cadastro;
module.exports.criarSessao = criarSessao;
module.exports.pages = pages;
module.exports.mostra_status = mostra_status;
module.exports.interacao = interacao;
module.exports.notificacoes_user = notificacoes_user;
module.exports.recuperar_senha = recuperar_senha;
module.exports.atualiza_geral = atualiza_geral;
module.exports.atualiza_endereco = atualiza_endereco;
module.exports.atualiza_emails = atualiza_emails;
module.exports.atualiza_telefones = atualiza_telefones;
module.exports.atualiza_midiasocial = atualiza_midiasocial;
module.exports.deletar = deletar;
module.exports.last_id = last_id;
module.exports.toco = toco;
module.exports.curto = curto;
module.exports.verificaExistencia = verificaExistencia;
//# sourceMappingURL=dados.js.map