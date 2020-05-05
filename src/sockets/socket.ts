import { Socket, Server } from "socket.io";

//Client Disconnected Listener
export const disconnect = (client: Socket) => client.on('disconnect', () => {
    console.log('Client connection has finished')
}); 

//Message Listener
export const messageListener = (client:Socket, io:Server) => client.on('message', (message) => {
    io.emit('new message' ,message);
});