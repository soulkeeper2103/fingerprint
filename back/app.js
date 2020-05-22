const bodyParser = require('body-parser');
const express = require('express');
const cors = require("cors");
const mysql= require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password: '1234',
    database : 'users',
});


class Application {
    constructor() {
        // Создаем наше Express-приложение.
        this.expressApp = express();
        this.expressApp.use(cors());
        this.attachRoutes();
    }

    attachRoutes() {
        let app = this.expressApp;
        let jsonParser = bodyParser.json();
        app.use(express.json());
        app.post("/check/", this.fingerprint.bind(this));
    }

    fingerprint(req, res)
    {

        console.log(req.headers)
        connection.query('CALL AddNewUSer(?,?,?,?,?,?)',
            [
                req.body.data.cpus,
                "" + req.body.data.languages + "",
                req.body.data.winy,
                req.body.data.winx,
                "" + req.body.data.webgl + "",
                req.body.data.colordepth,
            ],
            function (error, results, fields) {
                if(error){
                    console.log(error);
                } else {
                    console.log(results);
                    res.status(200).send(results[0])
                }
            });
    }

}

module.exports = Application;
