import { Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Sponsor } from '../entities/sponsor.entity';
import { Campaign } from '../entities/campaign.entity';
import { SponsorPledge } from '../entities/sponsor-pledge.entity';
import { AuthRequest } from '../middleware/auth.middleware';
import { ApiError } from '../middleware/error.middleware';

export class SponsorController {
    private sponsorRepository = AppDataSource.getRepository(Sponsor);
    private campaignRepository = AppDataSource.getRepository(Campaign);
    private pledgeRepository = AppDataSource.getRepository(SponsorPledge);

    createPledge = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                throw ApiError.unauthorized('Not authenticated');
            }

            const { campaignId, ratePerPoint, capAmount, message, adImageUrl } = req.body;

            if (!campaignId || !ratePerPoint) {
                throw ApiError.badRequest('Campaign ID and Rate per Point are required');
            }

            const sponsor = await this.sponsorRepository.findOne({
                where: { userId: req.user.id },
            });

            if (!sponsor) {
                throw ApiError.notFound('Sponsor profile not found');
            }

            const campaign = await this.campaignRepository.findOne({
                where: { id: campaignId },
            });

            if (!campaign) {
                throw ApiError.notFound('Campaign not found');
            }

            if (campaign.status === 'ended' || campaign.status === 'completed') {
                throw ApiError.badRequest('Cannot pledge to an ended campaign');
            }

            // Check if already pledged
            const existingPledge = await this.pledgeRepository.findOne({
                where: { sponsorId: sponsor.id, campaignId: campaignId },
            });

            if (existingPledge) {
                throw ApiError.conflict('You have already pledged to this campaign');
            }

            const pledge = this.pledgeRepository.create({
                sponsorId: sponsor.id,
                campaignId: campaignId,
                ratePerPoint,
                capAmount,
                message,
                adImageUrl,
                status: 'active'
            });

            await this.pledgeRepository.save(pledge);

            res.status(201).json({
                success: true,
                message: 'Pledge successfully created',
                data: pledge
            });

        } catch (error) {
            next(error);
        }
    };
}
