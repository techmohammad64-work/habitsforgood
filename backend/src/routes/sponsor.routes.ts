import { Router } from 'express';
import { SponsorController } from '../controllers/sponsor.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = Router();
const sponsorController = new SponsorController();

// Protected routes
router.use(authMiddleware);

// Pledge management
router.post('/pledge', roleMiddleware('sponsor'), sponsorController.createPledge);

export default router;
