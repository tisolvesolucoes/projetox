"use strict";

const nodemailer = require('nodemailer');

export function email() {    
    let smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL 
        auth: {
            user: 'fabio.nsousa1@gmail.com',
            pass: 'fEf7539510'
        }
    }; 
    let transporter = nodemailer.createTransport(smtpConfig);
}