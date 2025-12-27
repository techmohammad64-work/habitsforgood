import { Router } from 'express';
import { HabitController } from '../controllers/habit.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = Router();
const habitController = new HabitController();

// All routes require authentication
router.use(authMiddleware);

// Student habit submission
router.get('/:campaignId/today', roleMiddleware('student'), habitController.getTodayHabits);
router.post('/:campaignId/submit', roleMiddleware('student'), habitController.submitHabits);
router.get('/:campaignId/history', roleMiddleware('student'), habitController.getSubmissionHistory);

// Streak information
router.get('/:campaignId/streak', roleMiddleware('student'), habitController.getStreak);

export default router;
