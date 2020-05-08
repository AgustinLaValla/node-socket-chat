import { Request, Response } from "express";
import Server from "../server";
import { connectedUsers } from '../sockets/socket';

export function getAllUserIds(req: Request, res: Response) {
    const server = Server.instance;

    server.io.clients((err:any, clients: string[]) => {
        if(err) return res.status(400).json({ok:false, err});
        return res.json({ok:true, clients});
    });

};

export async function getUsersList(req:Request, res:Response): Promise<Response> {
    const userList = connectedUsers.getUserList();
    return res.json({ok:true, clients:userList});
};