import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// Registration routes
router.post('/register/student', authController.registerStudent);
router.post('/register/admin', authController.registerAdmin);
router.post('/register/sponsor', authController.registerSponsor);

// Login/Logout
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Token verification
router.get('/verify', authController.verifyToken);

export default router;
