import { Router, Request } from 'express';
import { sendMessages, sendPrivateMessages } from '../controller/messages.controller';
import { getAllUserIds, getUsersList } from '../controller/user-list.controller';

class IndexRoutes {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  };


  routes() {
    //Messages Routes
    this.router.post('/messages', sendMessages);
    this.router.post('/messages/:id', sendPrivateMessages);

    //User List Routes
    this.router.get('/users', getAllUserIds);
    this.router.get('/users/details', getUsersList);


  };
};

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;