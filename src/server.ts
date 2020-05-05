import express, { Application } from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import { SERVER_PORT } from './globals/enviroment'
import indexRoutes from './routes/router'
import socketIO from 'socket.io';
import http from 'http';
import * as socket from './sockets/socket';

class Server {

    private static _instace: Server;

    public app: Application;
    private server: http.Server;
    private port: number = SERVER_PORT;
    public io: SocketIO.Server;

    private constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIO(this.server);
        this.settings();
        this.middlewares();
        this.routes();
        this.socketListener();
    };

    public static get instance() {
        return this._instace || (this._instace = new this());
    };

    settings() { };

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan('dev'));
        this.app.use(cors({ origin: true, credentials: true }));
    };

    routes() {
        this.app.use(indexRoutes);
    };

    private socketListener() {
        this.io.on('connection', (client) => {
            console.log('New Client Connected!');

            //Client disconnection Listener
            socket.disconnect(client);
            //Message Listener
            socket.messageListener(client,this.io);
        });

    };

    async start() {
        this.server.listen(this.port);
        console.log(`${colors.magenta('Server on port:')} ${colors.green(this.port.toString())}`)
    };
};

export default Server;