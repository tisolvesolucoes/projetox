"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
function email() {
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
}
exports.email = email;
//# sourceMappingURL=email.js.map