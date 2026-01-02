import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user.entity';
import { Student } from '../entities/student.entity';
import { Admin } from '../entities/admin.entity';
import { Campaign } from '../entities/campaign.entity';
import { SponsorPledge } from '../entities/sponsor-pledge.entity';
import { HabitSubmission } from '../entities/habit-submission.entity';
import { Sponsor } from '../entities/sponsor.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { AuditLog } from '../entities/audit-log.entity';
import { AuthRequest } from '../middleware/auth.middleware';
import { ApiError } from '../middleware/error.middleware';
import { Between, MoreThan } from 'typeorm';

export class SuperAdminController {
    private userRepository = AppDataSource.getRepository(User);
    private studentRepository = AppDataSource.getRepository(Student);
    private adminRepository = AppDataSource.getRepository(Admin);
    private campaignRepository = AppDataSource.getRepository(Campaign);
    private pledgeRepository = AppDataSource.getRepository(SponsorPledge);
    private submissionRepository = AppDataSource.getRepository(HabitSubmission);
    private sponsorRepository = AppDataSource.getRepository(Sponsor);
    private enrollmentRepository = AppDataSource.getRepository(Enrollment);
    private auditLogRepository = AppDataSource.getRepository(AuditLog);

    getStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            // Basic Counts
            const totalUsers = await this.userRepository.count();
            const totalStudents = await this.studentRepository.count();
            const totalAdmins = await this.adminRepository.count();
            const totalSponsors = await this.sponsorRepository.count();
            const totalCampaigns = await this.campaignRepository.count();
            const activeCampaigns = await this.campaignRepository.count({ where: { status: 'active' } });
            const totalSubmissions = await this.submissionRepository.count();
            
            // Financials - Fixed calculation
            const pledges = await this.pledgeRepository.find();
            let totalPledged = 0;
            let totalRemaining = 0;
            let activeSponsors = 0;
            
            pledges.forEach(p => {
                const cap = parseFloat(p.capAmount?.toString() || '0');
                const rate = parseFloat(p.ratePerPoint?.toString() || '0');
                
                totalPledged += cap;
                totalRemaining += cap; // Simplified: in real scenario, calculate based on points earned
                
                if (p.status === 'active') {
                    activeSponsors++;
                }
            });
            
            // Engagement
            const submissions = await this.submissionRepository.find();
            const completedSubmissions = submissions.filter(s => s.completed).length;
            
            // Growth Metrics (Last 30 Days)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            const newUsersLast30Days = await this.userRepository.count({
                where: { createdAt: MoreThan(thirtyDaysAgo) }
            });
            
            const newCampaignsLast30Days = await this.campaignRepository.count({
                where: { createdAt: MoreThan(thirtyDaysAgo) }
            });
            
            res.json({
                success: true,
                data: {
                    users: {
                        total: totalUsers,
                        students: totalStudents,
                        admins: totalAdmins,
                        sponsors: totalSponsors,
                        newLast30Days: newUsersLast30Days
                    },
                    campaigns: {
                        total: totalCampaigns,
                        active: activeCampaigns,
                        newLast30Days: newCampaignsLast30Days
                    },
                    activity: {
                        totalSubmissions,
                        completedSubmissions
                    },
                    financials: {
                        totalPledged: totalPledged.toFixed(2),
                        totalRemaining: totalRemaining.toFixed(2),
                        activeSponsors
                    }
                }
            });
        } catch (error) {
            next(error);
        }
    };

    getAnalytics = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            // Demographics (Age groups)
            const students = await this.studentRepository.find();
            const ageGroups = {
                '5-10': 0,
                '11-15': 0,
                '16-18': 0,
                '19+': 0
            };
            
            students.forEach(s => {
                if (s.age <= 10) ageGroups['5-10']++;
                else if (s.age <= 15) ageGroups['11-15']++;
                else if (s.age <= 18) ageGroups['16-18']++;
                else ageGroups['19+']++;
            });

            // Popular Keywords (Tags)
            const campaigns = await this.campaignRepository.find();
            const tagCounts: Record<string, number> = {};
            campaigns.forEach(c => {
                c.categoryTags.forEach(tag => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            });
            
            // Sort tags
            const popularTags = Object.entries(tagCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([tag, count]) => ({ tag, count }));

            res.json({
                success: true,
                data: {
                    demographics: ageGroups,
                    popularTags
                }
            });
        } catch (error) {
            next(error);
        }
    };

    getTeachers = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const teachers = await this.adminRepository.find({
                relations: ['campaigns']
            });

            const teacherStatsPromises = teachers.map(async (t) => {
                // Count students enrolled in teacher's campaigns
                let totalStudents = 0;
                for (const campaign of t.campaigns) {
                    const enrollmentCount = await this.enrollmentRepository.count({
                        where: { campaignId: campaign.id }
                    });
                    totalStudents += enrollmentCount;
                }

                return {
                    id: t.id,
                    name: t.name,
                    organization: t.organization,
                    email: t.user?.email || 'N/A',
                    campaignCount: t.campaigns.length,
                    activeCampaigns: t.campaigns.filter(c => c.status === 'active').length,
                    totalStudents,
                    createdAt: t.createdAt
                };
            });

            const teacherStats = await Promise.all(teacherStatsPromises);

            res.json({
                success: true,
                data: teacherStats
            });
        } catch (error) {
            next(error);
        }
    };

    getGrowthMetrics = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            // Get daily growth for last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const users = await this.userRepository.find({
                where: { createdAt: MoreThan(thirtyDaysAgo) },
                order: { createdAt: 'ASC' }
            });

            const campaigns = await this.campaignRepository.find({
                where: { createdAt: MoreThan(thirtyDaysAgo) },
                order: { createdAt: 'ASC' }
            });

            // Group by date
            const usersByDate: Record<string, number> = {};
            const campaignsByDate: Record<string, number> = {};

            users.forEach(u => {
                const dateKey = u.createdAt.toISOString().split('T')[0];
                usersByDate[dateKey] = (usersByDate[dateKey] || 0) + 1;
            });

            campaigns.forEach(c => {
                const dateKey = c.createdAt.toISOString().split('T')[0];
                campaignsByDate[dateKey] = (campaignsByDate[dateKey] || 0) + 1;
            });

            // Convert to array format for charting
            const userGrowth = Object.entries(usersByDate).map(([date, count]) => ({ date, count }));
            const campaignGrowth = Object.entries(campaignsByDate).map(([date, count]) => ({ date, count }));

            res.json({
                success: true,
                data: {
                    userGrowth,
                    campaignGrowth
                }
            });
        } catch (error) {
            next(error);
        }
    };

    getTopSponsors = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const sponsors = await this.sponsorRepository.find({
                relations: ['pledges']
            });

            const sponsorStats = sponsors.map(s => {
                const totalPledged = s.pledges.reduce((sum, p) => {
                    return sum + parseFloat(p.capAmount?.toString() || '0');
                }, 0);

                const activePledges = s.pledges.filter(p => p.status === 'active').length;

                return {
                    id: s.id,
                    name: s.name,
                    email: s.user?.email || 'N/A',
                    totalPledged: totalPledged.toFixed(2),
                    activePledges,
                    totalPledges: s.pledges.length
                };
            }).sort((a, b) => parseFloat(b.totalPledged) - parseFloat(a.totalPledged));

            res.json({
                success: true,
                data: sponsorStats
            });
        } catch (error) {
            next(error);
        }
    };

    getEngagementMetrics = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            // Most popular campaigns by enrollment
            const campaigns = await this.campaignRepository.find({
                relations: ['enrollments']
            });

            const popularCampaigns = campaigns
                .map(c => ({
                    id: c.id,
                    title: c.title,
                    enrollments: c.enrollments?.length || 0,
                    status: c.status
                }))
                .sort((a, b) => b.enrollments - a.enrollments)
                .slice(0, 5);

            // Top students by XP
            const topStudents = await this.studentRepository.find({
                order: { xp: 'DESC' },
                take: 10
            });

            const topStudentStats = topStudents.map(s => ({
                id: s.id,
                displayName: s.displayName,
                xp: s.xp || 0,
                level: s.level || 1,
                rank: s.rank || 'E-Rank'
            }));

            res.json({
                success: true,
                data: {
                    popularCampaigns,
                    topStudents: topStudentStats
                }
            });
        } catch (error) {
            next(error);
        }
    };

    getAuditLogs = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const limit = parseInt(req.query.limit as string) || 100;
            const logs = await this.auditLogRepository.find({
                relations: ['user'],
                order: { createdAt: 'DESC' },
                take: limit
            });

            const formattedLogs = logs.map(log => ({
                id: log.id,
                action: log.action,
                user: {
                    id: log.user?.id,
                    email: log.user?.email,
                    role: log.user?.role
                },
                entityType: log.entityType,
                entityId: log.entityId,
                details: log.details,
                ipAddress: log.ipAddress,
                userAgent: log.userAgent,
                createdAt: log.createdAt
            }));

            res.json({
                success: true,
                data: formattedLogs
            });
        } catch (error) {
            next(error);
        }
    };

    getActivityMetrics = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            // DAU - Daily Active Users (users who logged in today)
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const dailyActiveUsers = await this.userRepository.count({
                where: { lastLogin: MoreThan(today) }
            });

            // WAU - Weekly Active Users (users who logged in in the last 7 days)
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            
            const weeklyActiveUsers = await this.userRepository.count({
                where: { lastLogin: MoreThan(sevenDaysAgo) }
            });

            // Recent activity (last 24 hours of audit logs)
            const oneDayAgo = new Date();
            oneDayAgo.setDate(oneDayAgo.getDate() - 1);

            const recentActivity = await this.auditLogRepository.count({
                where: { createdAt: MoreThan(oneDayAgo) }
            });

            res.json({
                success: true,
                data: {
                    dailyActiveUsers,
                    weeklyActiveUsers,
                    recentActivity
                }
            });
        } catch (error) {
            next(error);
        }
    };

    getGeographicData = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            // Get students by region
            const students = await this.studentRepository.find();
            
            const regionCounts: Record<string, number> = {};
            const cityCounts: Record<string, number> = {};
            const stateCounts: Record<string, number> = {};
            
            students.forEach(s => {
                if (s.region) {
                    regionCounts[s.region] = (regionCounts[s.region] || 0) + 1;
                }
                if (s.city) {
                    cityCounts[s.city] = (cityCounts[s.city] || 0) + 1;
                }
                if (s.state) {
                    stateCounts[s.state] = (stateCounts[s.state] || 0) + 1;
                }
            });

            // Get campaigns by region
            const campaigns = await this.campaignRepository.find();
            const campaignsByRegion: Record<string, number> = {};
            
            campaigns.forEach(c => {
                if (c.region) {
                    campaignsByRegion[c.region] = (campaignsByRegion[c.region] || 0) + 1;
                }
            });

            // Hot zones - regions with most students
            const hotZones = Object.entries(regionCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([region, count]) => ({ region, studentCount: count }));

            // Top cities
            const topCities = Object.entries(cityCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10)
                .map(([city, count]) => ({ city, studentCount: count }));

            // Top states
            const topStates = Object.entries(stateCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10)
                .map(([state, count]) => ({ state, studentCount: count }));

            res.json({
                success: true,
                data: {
                    hotZones,
                    topCities,
                    topStates,
                    regionDistribution: regionCounts,
                    campaignsByRegion
                }
            });
        } catch (error) {
            next(error);
        }
    };

    getRegionalEngagement = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { region } = req.query;

            // Get students in region
            const students = await this.studentRepository.find({
                where: region ? { region: region as string } : {},
                relations: ['enrollments', 'submissions']
            });

            // Calculate engagement metrics per region
            const regionMetrics: Record<string, any> = {};

            students.forEach(s => {
                const studentRegion = s.region || 'Unknown';
                
                if (!regionMetrics[studentRegion]) {
                    regionMetrics[studentRegion] = {
                        region: studentRegion,
                        totalStudents: 0,
                        totalEnrollments: 0,
                        totalSubmissions: 0,
                        averageXp: 0,
                        totalXp: 0
                    };
                }

                regionMetrics[studentRegion].totalStudents++;
                regionMetrics[studentRegion].totalEnrollments += s.enrollments?.length || 0;
                regionMetrics[studentRegion].totalSubmissions += s.submissions?.length || 0;
                regionMetrics[studentRegion].totalXp += s.xp || 0;
            });

            // Calculate averages
            Object.values(regionMetrics).forEach((metrics: any) => {
                metrics.averageXp = Math.round(metrics.totalXp / metrics.totalStudents);
                metrics.engagementRate = metrics.totalStudents > 0 
                    ? ((metrics.totalSubmissions / metrics.totalStudents) * 100).toFixed(1)
                    : '0';
            });

            const sortedMetrics = Object.values(regionMetrics).sort((a: any, b: any) => 
                b.totalStudents - a.totalStudents
            );

            res.json({
                success: true,
                data: sortedMetrics
            });
        } catch (error) {
            next(error);
        }
    };
}
