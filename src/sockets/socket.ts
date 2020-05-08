import { Socket, Server } from "socket.io";
import { UserList } from '../classes/user-list';
import { User } from "../classes/user";


export const connectedUsers = new UserList();

//Connect Client (add to a list user)
export const connectClient = (client: Socket) => {
    let user = new User(client.id);
    connectedUsers.addUser(user);
};

//Username Listener
export const usernameListener = (client: Socket, io: Server) => client.on('user-config', (payload, callback) => {
    connectedUsers.updateName(client.id, payload.name);
    callback({
        ok: true,
        message: `Usuario ${payload.name} setted`
    });
    io.emit('active-users', connectedUsers.getUserList());
});

//Message Listener
export const messageListener = (client: Socket, io: Server) => client.on('message', (message) => {
    io.emit('new message', message);
});
export const getActiveUsers = (client: Socket, io: Server) => client.on('get users', () => {
    io.to(client.id).emit('active-users', connectedUsers.getUserList());
});
//Client Disconnected Listener
export const disconnect = (client: Socket, io: Server) => client.on('disconnect', () => {
    connectedUsers.deleteUser(client.id); //Delete user logged out
    io.emit('active-users', connectedUsers.getUserList()); //Emit the list again
}); 