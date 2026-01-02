import { Campaign } from '../entities/campaign.entity';

export class AIService {
    /**
     * Analyzes a campaign and determines its difficulty rank and XP reward
     * based on keywords in the title and description.
     */
    static analyzeCampaignDifficulty(title: string, description: string): { rank: string, xp: number } {
        const text = (title + ' ' + description).toLowerCase();
        
        // Keywords for high difficulty (physical exertion, long duration, complex tasks)
        const sRankKeywords = ['marathon', 'triathlon', 'advanced', 'intense', 'extreme', '10km', '20km', 'expert'];
        const aRankKeywords = ['run', 'jog', 'swim', 'gym', 'workout', '5km', 'training', 'hard'];
        const bRankKeywords = ['walk', 'hike', 'cycle', 'meditate', 'study', 'read', '30 minutes'];
        const cRankKeywords = ['water', 'hydrate', 'sleep', 'clean', 'organize', '15 minutes'];
        
        // Check for S-Rank
        if (sRankKeywords.some(keyword => text.includes(keyword))) {
            return { rank: 'S-Rank', xp: 50 };
        }
        
        // Check for A-Rank
        if (aRankKeywords.some(keyword => text.includes(keyword))) {
            return { rank: 'A-Rank', xp: 30 };
        }
        
        // Check for B-Rank
        if (bRankKeywords.some(keyword => text.includes(keyword))) {
            return { rank: 'B-Rank', xp: 20 };
        }
        
        // Check for C-Rank
        if (cRankKeywords.some(keyword => text.includes(keyword))) {
            return { rank: 'C-Rank', xp: 15 };
        }
        
        // Default E-Rank (simple tasks)
        return { rank: 'E-Rank', xp: 10 };
    }
}
