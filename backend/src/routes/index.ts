import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import campaignRoutes from './campaign.routes';
import habitRoutes from './habit.routes';
import dashboardRoutes from './dashboard.routes';
import sponsorRoutes from './sponsor.routes';
import superAdminRoutes from './super-admin.routes';
import questRoutes from './quest.routes';
import viralRoutes from './viral.routes';

const router = Router();

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/habits', habitRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/sponsors', sponsorRoutes);
router.use('/super-admin', superAdminRoutes);
router.use('/quests', questRoutes);
router.use('/viral', viralRoutes);

// API info
router.get('/', (_req, res) => {
    res.json({
        name: 'Habits for Good API',
        version: '2.0.0',
        project: 'Project: Arise',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            campaigns: '/api/campaigns',
            habits: '/api/habits',
            dashboard: '/api/dashboard',
            quests: '/api/quests',
            viral: '/api/viral',
        },
    });
});

export default router;
