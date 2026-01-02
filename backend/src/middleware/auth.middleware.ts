import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from './error.middleware';
import { isSuperAdminWhitelisted } from '../config/whitelist';
import { AuditService } from '../services/audit.service';

const auditService = new AuditService();

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    };
}

export interface JwtPayload {
    id: number;
    email: string;
    role: string;
}

export const authMiddleware = (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw ApiError.unauthorized('No token provided');
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'dev-secret-key';

        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.user = decoded;

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            next(ApiError.unauthorized('Invalid token'));
        } else if (error instanceof jwt.TokenExpiredError) {
            next(ApiError.unauthorized('Token expired'));
        } else {
            next(error);
        }
    }
};

export const roleMiddleware = (...allowedRoles: string[]) => {
    return (req: AuthRequest, _res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(ApiError.unauthorized('Authentication required'));
        }

        // Special handling for super-admin role
        if (req.user.role === 'super-admin') {
            if (!isSuperAdminWhitelisted(req.user.email)) {
                // Log unauthorized super-admin access attempt
                auditService.log(
                    req.user.id,
                    'UNAUTHORIZED_SUPER_ADMIN_ACCESS',
                    'user',
                    req.user.id,
                    { email: req.user.email, path: req.path },
                    req
                );
                return next(ApiError.forbidden('Super admin access not authorized for this email'));
            }
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(ApiError.forbidden('Insufficient permissions'));
        }

        next();
    };
};

// Optional auth middleware - attaches user if token present, but doesn't fail if absent
export const optionalAuthMiddleware = (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // No token - just continue without user
            return next();
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'dev-secret-key';

        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.user = decoded;

        next();
    } catch (error) {
        // Token invalid - continue without user (don't throw error)
        next();
    }
};
