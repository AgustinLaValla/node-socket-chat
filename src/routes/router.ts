import { Router, Request, Response } from 'express';
import Server from '../server';

class IndexRoutes {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  };

  getMessages(req: Request, res: Response) {
    const { sender,body } = req.body;

    const payload = { sender, body };

    const server = Server.instance;
    server.io.emit('new message', payload);

    return res.json({ ok: true, body});
  };

  getPrivateMessages(req: Request, res: Response) {
    const { sender,body } = req.body;
    const { id } = req.params;

    const payload = { sender, body };

    const server = Server.instance;
    server.io.in( id ).emit('private-msg', payload);
    return res.json({ok:true, body})
  };

  updateMessage(req: Request, res: Response) {
    const { body } = req;
    const { id } = req.params;
  };

  deleteMessage(req: Request, res: Response) {};

  routes() {
    this.router.post('/messages', this.getMessages);
    this.router.post('/messages/:id', this.getPrivateMessages);
    this.router.put('/update/:id', this.updateMessage);
    this.router.delete('/delete', this.deleteMessage)
  };
};

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;