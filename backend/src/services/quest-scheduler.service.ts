import cron from 'node-cron';
import { checkFailedQuests } from '../controllers/quest.controller';

export class QuestScheduler {
  static init() {
    // Run every day at midnight to check for failed quests
    cron.schedule('0 0 * * *', async () => {
      console.log('[QUEST SCHEDULER] Checking for failed daily quests...');
      try {
        await checkFailedQuests();
        console.log('[QUEST SCHEDULER] Failed quest check completed');
      } catch (error) {
        console.error('[QUEST SCHEDULER] Error checking failed quests:', error);
      }
    });

    console.log('[QUEST SCHEDULER] Initialized - will check for failed quests daily at midnight');
  }
}
