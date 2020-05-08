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
        this.middlewares();
        this.routes();
        this.socketListener();
    };

    public static get instance() {
        return this._instace || (this._instace = new this());
    };

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
            //Add User to the user list
            socket.connectClient(client);
            //Username Listener
            socket.usernameListener(client, this.io);
            //Message Listener
            socket.messageListener(client,this.io);
            //Retrieve user
            socket.getActiveUsers(client, this.io);
            //Client disconnection Listener
            socket.disconnect(client, this.io);
        });

    };

    async start() {
        this.server.listen(this.port);
        console.log(`${colors.magenta('Server on port:')} ${colors.green(this.port.toString())}`)
    };
};

export default Server;