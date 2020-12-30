import express from 'express'
import AuthController from './controllers/AuthController';
import DashController from './controllers/DashController';
import UserController from './controllers/UserController';
import authMiddleware from './middlewares/AuthMiddlaware';


const routes = express();

routes.post('/users', UserController.create);
routes.post('/auth', AuthController.authenticate);

routes.post('/users/dashboard',authMiddleware,DashController.create)


export default routes;