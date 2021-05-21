import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'
import { createConnection } from "typeorm";
dotenv.config()

const PORT = process.env.APP_PORT || 3000;
createConnection().then(async connection => {

    let app = express()

    const logStream = fs.createWriteStream(path.join(path.join(__dirname, 'logs'), 'requests.log'), { flags: 'a' })
    app.use(morgan('dev', {
        stream: logStream
    }));

    app.use(helmet())
    // Middleware
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({
      extended: true
    }));


    //Routes
    const index = require('./router/index')
    app.use('/', index)

    //@ts-ignore
    app.use(function (err, req: Request, res: Response, next: NextFunction) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: {}
        });
    });

    let server = http.createServer(app);
    server.listen(PORT, () => {
        console.log("Server start listening on : ", server.address());
        if (!process.env.SERVER_ADDR)
        //@ts-ignore
        process.env.SERVER_ADDR = server.address()?.address
        if (!process.env.APP_PORT)
        //@ts-ignore
            process.env.APP_PORT = server.address()?.port.toString()
    });

}).catch(error => console.log("unkown error happend please create db if not exist and make sure everything is right then try again",error));