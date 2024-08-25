import express from 'express';
import { authController } from '../controllers';
import { Router } from 'express';

const router: Router = express.Router();

router.post('/signin', authController.login);
router.post('/signup', authController.signup);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);

export { router as authRouter };