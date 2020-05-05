import { Router, Request, Response } from 'express';

class IndexRoutes {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  };

  getMessages(req: Request, res: Response) {
    return res.json({ ok: true, message: 'Get request succesfully received' });
  };

  createMessage(req: Request, res: Response) {
    return res.json({ ok: true, message: 'Post request succesfully received' });
  };

  updateMessage(req: Request, res: Response) {
    const { body } = req;
    const { id } = req.params;
    return res.json({ ok: true, message: 'Put request succesfully received', body, id });
  };

  deleteMessage(req: Request, res: Response) {
    res.json({ ok: true, message: 'Delete request succesfully received' });
  };

  routes() {
    this.router.get('/messages', this.getMessages);
    this.router.post('/create', this.createMessage);
    this.router.put('/update/:id', this.updateMessage);
    this.router.delete('/delete', this.deleteMessage)
  };
};

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;