import { Router } from 'express';
import { SuperAdminController } from '../controllers/super-admin.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = Router();
const controller = new SuperAdminController();

router.use(authMiddleware);
router.use(roleMiddleware('super-admin'));

router.get('/stats', controller.getStats);
router.get('/analytics', controller.getAnalytics);
router.get('/teachers', controller.getTeachers);
router.get('/growth', controller.getGrowthMetrics);
router.get('/sponsors', controller.getTopSponsors);
router.get('/engagement', controller.getEngagementMetrics);
router.get('/audit-logs', controller.getAuditLogs);
router.get('/activity', controller.getActivityMetrics);
router.get('/geographic', controller.getGeographicData);
router.get('/regional-engagement', controller.getRegionalEngagement);

export default router;
