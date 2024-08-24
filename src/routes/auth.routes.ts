import express from 'express';
import { authController } from '../controllers';

const router = express.Router();

router.post('/signin', authController.login);
router.post('/signup', authController.signup);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);

export default router;