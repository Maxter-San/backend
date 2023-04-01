import { Router } from 'express';
import logInController from './logInController';
import signUpController from './signUpController';
import uploadFileController from './uploadFileController';
import multer from 'multer';

const routes = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

routes.get('/', (req, res) => res.send('Backend is ready'));

routes.post('/login', logInController);
routes.post('/signup', signUpController);
routes.post('/uploadFile', upload.single('foto'), uploadFileController);

export default routes;