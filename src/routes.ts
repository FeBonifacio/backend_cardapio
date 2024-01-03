import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';

const router = Router();

// Rotas user
router.post('/users', new CreateUserController().handle)

export { router };