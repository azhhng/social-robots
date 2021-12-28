import { Application } from "express";
import { Server as HTTPServer } from "http";
import { User } from "./user";
import * as express from "express";
import path = require("path");

export class PHL342Server {
    private httpServer: HTTPServer;
    private app: Application;
    private user: User;
    private readonly DEFAULT_PORT = 3001;

    constructor() {
        this.app = require('express')();
        this.app.use(express.json());

        this.app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
            next();
        });

        this.httpServer = require('http').createServer(this.app);
        this.app.use('/favicon.ico', express.static('img/favicon.ico'));
        this.app.use(express.static(path.join(__dirname, '../build')));
        this.configureRoutes();
        this.user = new User();

    }

    private configureRoutes(): void {

        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../build', 'index.html'));
        });

        this.app.get('/factory-entrance', (req, res) => {
            res.sendFile(path.join(__dirname, '../build', 'index.html'));
        });

        this.app.get('/robot-factory', (req, res) => {
            res.sendFile(path.join(__dirname, '../build', 'index.html'));
        });

        this.app.get('/orientation', (req, res) => {
            res.sendFile(path.join(__dirname, '../build', 'index.html'));
        });

        this.app.get('/robot-union', (req, res) => {
            res.sendFile(path.join(__dirname, '../build', 'index.html'));
        });

        this.app.get('/developer-office', (req, res) => {
            res.sendFile(path.join(__dirname, '../build', 'index.html'));
        });

        this.app.get('/ending1', (req, res) => {
            res.sendFile(path.join(__dirname, '../build', 'index.html'));
        });


        this.app.get('/ending1A', (req, res) => {
            res.sendFile(path.join(__dirname, '../build', 'index.html'));
        });


        this.app.get('/ending2', (req, res) => {
            res.sendFile(path.join(__dirname, '../build', 'index.html'));
        });


        this.app.get('/about', (req, res) => {
            res.sendFile(path.join(__dirname, '../build', 'index.html'));
        });


        this.app.get('/references', (req, res) => {
            res.sendFile(path.join(__dirname, '../build', 'index.html'));
        });

        // ========================================

        this.app.post('/set-name', (req, res) => {
            this.user.setName(req.body.name);
        });

        this.app.post('/set-robot-name', (req, res) => {
            this.user.getRobot().setName(req.body.name);
        });

        this.app.get('/get-name', (req, res) => {
            res.json(this.user.getName());
        });

        this.app.get('/get-robot-name', (req, res) => {
            res.json(this.user.getRobot().getName());
        });

        this.app.post('/set-robot-appearance', (req, res) => {
            this.user.getRobot().setAppearance(req.body.eyeSymbol, req.body.bodySymbol, req.body.armsSymbol, req.body.legsSymbol).then((message) => {
                res.json(message);
            });
        });

        this.app.get('/get-robot-appearance', (req, res) => {
            res.json([this.user.getRobot().getEyes(), this.user.getRobot().getBody(), this.user.getRobot().getArms(), this.user.getRobot().getLegs()]);
        })

        this.app.get('/get-checkpoint', (req, res) => {
            res.json(this.user.getCheckpoint());
        })

        this.app.post('/advance-checkpoint', (req, res) => {
            this.user.advanceCheckpoint().then((message) => {
                res.json(message);
            });
        });

        this.app.post('/set-checkpoint', (req, res) => {
            this.user.setCheckpoint(req.body.checkpoint).then((message) => {
                res.json(message);
            });
        });
    }

    // public listen(callback: (port: number) => void): void {
    //     this.httpServer.listen(this.DEFAULT_PORT, () => {
    //         callback(this.DEFAULT_PORT);
    //     });
    // }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(process.env.PORT || this.DEFAULT_PORT, () =>
            callback(Number(process.env.PORT))
        );
    }
}