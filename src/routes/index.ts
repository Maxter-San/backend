import { Router } from 'express';
import logInController from './logInController';
import signUpController from './signUpController';
//import uploadFileController from './uploadFileController';

const routes = Router();

routes.get('/', (req, res) => res.send('Backend is ready'));

routes.post('/login', logInController);
routes.post('/signup', signUpController);
//routes.post('/uploadFile', uploadFileController);

export default routes;
