
// In CampaignController class
getActiveAd = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        // Get active pledges with ads
        const pledges = await this.pledgeRepository.find({
            where: {
                campaignId: parseInt(id),
                status: 'active'
            },
            relations: ['sponsor']
        });

        // Filter for pledges with messages
        const ads = pledges.filter(p => p.message);

        if (ads.length === 0) {
            res.json({ success: true, data: null });
            return;
        }

        // Pick random ad
        const randomAd = ads[Math.floor(Math.random() * ads.length)];

        res.json({
            success: true,
            data: {
                sponsorName: randomAd.sponsor.name,
                message: randomAd.message,
                adImageUrl: randomAd.adImageUrl
            }
        });
    } catch (error) {
        next(error);
    }
};
