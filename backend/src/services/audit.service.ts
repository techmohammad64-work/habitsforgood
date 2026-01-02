import { Request } from 'express';
import { AppDataSource } from '../config/database';
import { AuditLog } from '../entities/audit-log.entity';

export class AuditService {
    private auditLogRepository = AppDataSource.getRepository(AuditLog);

    async log(
        userId: number | undefined,
        action: string,
        entityType?: string,
        entityId?: number,
        details?: any,
        req?: Request
    ): Promise<void> {
        try {
            const auditLog = this.auditLogRepository.create({
                userId,
                action,
                entityType,
                entityId,
                details,
                ipAddress: req ? this.getIpAddress(req) : undefined,
                userAgent: req?.headers['user-agent']
            });

            await this.auditLogRepository.save(auditLog);
        } catch (error) {
            // Log but don't throw - audit failure shouldn't break the app
            console.error('Audit log error:', error);
        }
    }

    private getIpAddress(req: Request): string {
        return (
            (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
            req.socket.remoteAddress ||
            'unknown'
        );
    }

    async getRecentLogs(limit: number = 100) {
        return this.auditLogRepository.find({
            relations: ['user'],
            order: { createdAt: 'DESC' },
            take: limit
        });
    }

    async getLogsByUser(userId: number, limit: number = 50) {
        return this.auditLogRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            take: limit
        });
    }

    async getLogsByAction(action: string, limit: number = 50) {
        return this.auditLogRepository.find({
            where: { action },
            order: { createdAt: 'DESC' },
            take: limit
        });
    }
}
