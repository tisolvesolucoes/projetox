"use strict";

function email() {
    var smtpConfig = {
        host: "smtp.gmail.com",
        port: 465,
        secure: !0,
        auth: {
            user: "fabio.nsousa1@gmail.com",
            pass: "fEf7539510"
        }
    };
    nodemailer.createTransport(smtpConfig);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var nodemailer = require("nodemailer");

exports.email = email;
//# sourceMappingURL=email.js.map