import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = Router();
const dashboardController = new DashboardController();

// All routes require authentication
router.use(authMiddleware);

// Student dashboard
router.get('/student', roleMiddleware('student'), dashboardController.getStudentDashboard);
router.get('/student/campaigns', roleMiddleware('student'), dashboardController.getStudentCampaigns);
router.get('/student/stats', roleMiddleware('student'), dashboardController.getStudentStats);
router.get('/student/badges', roleMiddleware('student'), dashboardController.getStudentBadges);

// Admin dashboard
router.get('/admin', roleMiddleware('admin'), dashboardController.getAdminDashboard);
router.get('/admin/campaigns', roleMiddleware('admin'), dashboardController.getAdminCampaigns);
router.get('/admin/students', roleMiddleware('admin'), dashboardController.getAdminStudents);

// Sponsor dashboard
router.get('/sponsor', roleMiddleware('sponsor'), dashboardController.getSponsorDashboard);
router.get('/sponsor/pledges', roleMiddleware('sponsor'), dashboardController.getSponsorPledges);
router.get('/sponsor/impact', roleMiddleware('sponsor'), dashboardController.getSponsorImpact);

export default router;
