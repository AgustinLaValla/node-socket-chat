import { Request, Response } from "express";
import Server from "../server";

export function sendMessages(req: Request, res: Response): Response {
    const { sender, body } = req.body;

    const payload = { sender, body };

    const server = Server.instance;
    server.io.emit('new message', payload);

    return res.json({ ok: true, body });
};

export function sendPrivateMessages(req: Request, res: Response): Response {
    const { sender, body } = req.body;
    const { id } = req.params;

    const payload = { sender, body };

    const server = Server.instance;
    server.io.in(id).emit('private-msg', payload);
    return res.json({ ok: true, body })
};
