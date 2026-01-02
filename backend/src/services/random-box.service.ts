import { AppDataSource } from '../config/database';
import { Reward, RewardType, RewardRarity } from '../entities/reward.entity';
import { Student } from '../entities/student.entity';
import { Badge } from '../entities/badge.entity';

interface RewardDefinition {
  name: string;
  description: string;
  rarity: RewardRarity;
  xpBonus: number;
  pointsBonus: number;
  iconUrl?: string;
  weight: number; // Drop chance weight
}

// Define reward pool with weighted probabilities
const REWARD_POOL: RewardDefinition[] = [
  // Common Rewards (60% chance)
  {
    name: 'Small XP Boost',
    description: '+50 XP',
    rarity: RewardRarity.COMMON,
    xpBonus: 50,
    pointsBonus: 0,
    iconUrl: '/assets/rewards/xp-common.png',
    weight: 30,
  },
  {
    name: 'Donation Points',
    description: '+25 Points for charity',
    rarity: RewardRarity.COMMON,
    xpBonus: 0,
    pointsBonus: 25,
    iconUrl: '/assets/rewards/points-common.png',
    weight: 30,
  },

  // Uncommon Rewards (25% chance)
  {
    name: 'Medium XP Boost',
    description: '+150 XP',
    rarity: RewardRarity.UNCOMMON,
    xpBonus: 150,
    pointsBonus: 0,
    iconUrl: '/assets/rewards/xp-uncommon.png',
    weight: 15,
  },
  {
    name: 'Bonus Points',
    description: '+75 Points for charity',
    rarity: RewardRarity.UNCOMMON,
    xpBonus: 0,
    pointsBonus: 75,
    iconUrl: '/assets/rewards/points-uncommon.png',
    weight: 10,
  },

  // Rare Rewards (10% chance)
  {
    name: 'Large XP Boost',
    description: '+300 XP',
    rarity: RewardRarity.RARE,
    xpBonus: 300,
    pointsBonus: 0,
    iconUrl: '/assets/rewards/xp-rare.png',
    weight: 6,
  },
  {
    name: 'Major Points',
    description: '+150 Points for charity',
    rarity: RewardRarity.RARE,
    xpBonus: 0,
    pointsBonus: 150,
    iconUrl: '/assets/rewards/points-rare.png',
    weight: 4,
  },

  // Epic Rewards (4% chance)
  {
    name: 'Epic XP Surge',
    description: '+500 XP',
    rarity: RewardRarity.EPIC,
    xpBonus: 500,
    pointsBonus: 0,
    iconUrl: '/assets/rewards/xp-epic.png',
    weight: 2,
  },
  {
    name: 'Epic Donation Bonus',
    description: '+250 Points for charity',
    rarity: RewardRarity.EPIC,
    xpBonus: 0,
    pointsBonus: 250,
    iconUrl: '/assets/rewards/points-epic.png',
    weight: 2,
  },

  // Legendary Rewards (1% chance)
  {
    name: '🌟 LEGENDARY XP BLESSING',
    description: '+1000 XP - A gift from the System',
    rarity: RewardRarity.LEGENDARY,
    xpBonus: 1000,
    pointsBonus: 0,
    iconUrl: '/assets/rewards/xp-legendary.png',
    weight: 0.5,
  },
  {
    name: '🌟 LEGENDARY DONATION SURGE',
    description: '+500 Points - Maximum Impact',
    rarity: RewardRarity.LEGENDARY,
    xpBonus: 0,
    pointsBonus: 500,
    iconUrl: '/assets/rewards/points-legendary.png',
    weight: 0.5,
  },
];

export class RandomBoxService {
  private rewardRepo = AppDataSource.getRepository(Reward);
  private studentRepo = AppDataSource.getRepository(Student);

  // Open a random box and get a reward
  async openRandomBox(studentId: string, boxType: RewardType): Promise<Reward> {
    const student = await this.studentRepo.findOne({
      where: { id: parseInt(studentId) },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    // Select a random reward based on weighted probabilities
    const selectedReward = this.selectWeightedReward();

    // Create reward record
    const reward = this.rewardRepo.create({
      studentId,
      type: boxType,
      rarity: selectedReward.rarity,
      name: selectedReward.name,
      description: selectedReward.description,
      xpBonus: selectedReward.xpBonus,
      pointsBonus: selectedReward.pointsBonus,
      iconUrl: selectedReward.iconUrl,
    });

    await this.rewardRepo.save(reward);

    // Apply rewards to student
    student.xp += selectedReward.xpBonus;
    await this.studentRepo.save(student);

    console.log(
      `📦 Random Box Opened: ${selectedReward.name} (${selectedReward.rarity}) for student ${studentId}`
    );

    return reward;
  }

  // Weighted random selection
  private selectWeightedReward(): RewardDefinition {
    const totalWeight = REWARD_POOL.reduce((sum, reward) => sum + reward.weight, 0);
    let random = Math.random() * totalWeight;

    for (const reward of REWARD_POOL) {
      random -= reward.weight;
      if (random <= 0) {
        return reward;
      }
    }

    // Fallback to first reward (should never happen)
    return REWARD_POOL[0];
  }

  // Grant a quest completion box
  async grantQuestCompletionBox(studentId: string): Promise<Reward> {
    return this.openRandomBox(studentId, RewardType.QUEST_COMPLETION);
  }

  // Grant a streak milestone box
  async grantStreakMilestoneBox(studentId: string): Promise<Reward> {
    return this.openRandomBox(studentId, RewardType.STREAK_MILESTONE);
  }

  // Grant a rank-up box (better odds)
  async grantRankUpBox(studentId: string): Promise<Reward> {
    // For rank-up, we can bias towards better rewards
    // by temporarily modifying the pool or creating a special pool
    return this.openRandomBox(studentId, RewardType.RANK_UP);
  }

  // Get student's reward history
  async getRewardHistory(studentId: string): Promise<Reward[]> {
    return this.rewardRepo.find({
      where: { studentId },
      order: { receivedAt: 'DESC' },
      take: 50, // Last 50 rewards
    });
  }

  // Get statistics for rewards
  async getRewardStats(studentId: string): Promise<any> {
    const rewards = await this.rewardRepo.find({
      where: { studentId },
    });

    const stats = {
      totalBoxesOpened: rewards.length,
      totalXpGained: rewards.reduce((sum, r) => sum + r.xpBonus, 0),
      totalPointsGained: rewards.reduce((sum, r) => sum + r.pointsBonus, 0),
      rarityBreakdown: {
        common: rewards.filter((r) => r.rarity === RewardRarity.COMMON).length,
        uncommon: rewards.filter((r) => r.rarity === RewardRarity.UNCOMMON).length,
        rare: rewards.filter((r) => r.rarity === RewardRarity.RARE).length,
        epic: rewards.filter((r) => r.rarity === RewardRarity.EPIC).length,
        legendary: rewards.filter((r) => r.rarity === RewardRarity.LEGENDARY).length,
      },
      bestReward: rewards.sort((a, b) => b.xpBonus + b.pointsBonus - (a.xpBonus + a.pointsBonus))[0],
    };

    return stats;
  }
}

export const randomBoxService = new RandomBoxService();
