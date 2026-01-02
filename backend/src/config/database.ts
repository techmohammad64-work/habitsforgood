import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Student } from '../entities/student.entity';
import { Admin } from '../entities/admin.entity';
import { Sponsor } from '../entities/sponsor.entity';
import { Cause } from '../entities/cause.entity';
import { Campaign } from '../entities/campaign.entity';
import { Habit } from '../entities/habit.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { HabitSubmission } from '../entities/habit-submission.entity';
import { Streak } from '../entities/streak.entity';
import { PointsLedger } from '../entities/points-ledger.entity';
import { SponsorPledge } from '../entities/sponsor-pledge.entity';
import { Badge } from '../entities/badge.entity';
import { Notification } from '../entities/notification.entity';
import { NotificationLog } from '../entities/notification-log.entity';
import { AuditLog } from '../entities/audit-log.entity';
import { DailyQuest } from '../entities/daily-quest.entity';
import { PenaltyQuest } from '../entities/penalty-quest.entity';
import { Reward } from '../entities/reward.entity';
import { Achievement } from '../entities/achievement.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER || 'habituser',
    password: process.env.POSTGRES_PASSWORD || 'habitpass123',
    database: process.env.POSTGRES_DB || 'habitsforgood',
    synchronize: false, // Use migrations in production
    logging: process.env.NODE_ENV === 'development',
    entities: [
        User,
        Student,
        Admin,
        Sponsor,
        Cause,
        Campaign,
        Habit,
        Enrollment,
        HabitSubmission,
        Streak,
        PointsLedger,
        SponsorPledge,
        Badge,
        Notification,
        NotificationLog,
        AuditLog,
        DailyQuest,
        PenaltyQuest,
        Reward,
        Achievement,
    ],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
});
