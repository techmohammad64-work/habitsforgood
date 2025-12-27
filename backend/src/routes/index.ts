import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import campaignRoutes from './campaign.routes';
import habitRoutes from './habit.routes';
import dashboardRoutes from './dashboard.routes';
import sponsorRoutes from './sponsor.routes';

const router = Router();

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/habits', habitRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/sponsors', sponsorRoutes);

// API info
router.get('/', (_req, res) => {
    res.json({
        name: 'Habits for Good API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            campaigns: '/api/campaigns',
            habits: '/api/habits',
            dashboard: '/api/dashboard',
        },
    });
});

export default router;
