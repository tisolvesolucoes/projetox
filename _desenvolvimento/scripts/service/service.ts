"use strict";

import * as express from "express";
const app = express();

export function service1() {
    let router = express.Router();
    
    router.get('/', function(req, res) {
        let teste = res.json({ message: 'hooray! welcome to our api!' });
        console.log(teste);
    });

    app.use('/api', router);   
}