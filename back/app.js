const bodyParser = require('body-parser');
const express = require('express');
const cors = require("cors");
const mysql= require('mysql');
const TorTest = require('tor-test');
const ip2proxy = require("ip2proxy-nodejs");
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
        ip2proxy.Open("./IP2PROXY-LITE-PX8.BIN");
        console.log("isProxy: " + ip2proxy.isProxy(req.body.data.ip));
        console.log("ProxyType: " + ip2proxy.getProxyType(req.body.data.ip));
        console.log(ip2proxy.getAll(req.body.data.ip));
        console.log(req.body.data.ip)
        TorTest.isTor(req.body.data.ip, (err, isTor) => {
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
                        results[0].push(isTor)
                        res.status(200).send(results[0])
                    }
                });
        });

    }

}

module.exports = Application;
