import { Router } from 'express';
import logInController from './logInController';
import signUpController from './signUpController';
import existentMailController from './existentMailController';
import existentUserNameController from './existentUserNameController';
import uploadFileController from './uploadFileController';
import multer from 'multer';
import getUserController from './getUserController';
import logOutController from './logOutController';
import editProfileController from './editProfileController';
import deleteUserController from './deleteUserController';
import uploadDrawController from './uploadDraw';
import uploadDrawTagsController from './uploadDrawTags';
import drawsController from './drawsController';
import tagsController from './tagsController';
import drawController from './drawController';
import commentsController from './commentsController';
import commentController from './commentController';
import deleteCommentController from './deleteComment';

const routes = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

routes.get('/', (req, res) => res.send('Backend is ready'));

routes.post('/login', logInController);
routes.post('/signup', signUpController);
routes.post('/logout', logOutController);
routes.post('/getUser', getUserController);
routes.post('/editProfile', editProfileController);
routes.post('/deleteUser', deleteUserController);
routes.post('/existentMail', existentMailController);
routes.post('/existentUserName', existentUserNameController);

routes.post('/uploadDraw', uploadDrawController);
routes.post('/uploadDrawTags', uploadDrawTagsController);
routes.get('/draws', drawsController);
routes.get('/draw', drawController);

routes.get('/tags', tagsController);
routes.post('/comment', commentController);
routes.post('/deleteComment', deleteCommentController);
routes.get('/comments', commentsController);

routes.post('/uploadFile', upload.single('foto'), uploadFileController);

export default routes;