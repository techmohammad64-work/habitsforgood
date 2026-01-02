import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthService } from '@core/services/auth.service';
import { Campaign, ApiResponse } from '@core/services/campaign.service';

interface Badge {
  id: string;
  badgeType: string;
}

interface StudentDashboardData {
  student: {
    id: string;
    displayName: string;
    age: number;
    avatarUrl?: string;
    xp?: number;
    level?: number;
    rank?: string;
  };
  enrolledCampaigns: (Campaign & { streak: { currentStreak: number } })[];
  totalPoints: number;
  badges: Badge[];
  stats: {
    activeCampaigns: number;
    longestStreak: number;
    totalBadges: number;
  };
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="dashboard">
      @if (loading) {
        <div class="loading-state">
          <div class="spinner"></div>
        </div>
      } @else if (data) {
        <!-- Header -->
        <header class="dashboard-header" [attr.data-rank]="data.student.rank || 'E-Rank'">
          <!-- Particle Effects for A-Rank and above -->
          @if (shouldShowParticles()) {
            <div class="rank-particles">
              @for (i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]; track i) {
                <div class="particle"></div>
              }
            </div>
          }
          
          <div class="welcome-section">
            <div class="avatar-container">
              <div class="avatar">
                {{ getInitial(data.student.displayName) }}
              </div>
              <div class="level-badge" [attr.data-rank]="data.student.rank || 'E-Rank'">
                {{ data.student.level || 1 }}
              </div>
            </div>
            <div class="welcome-text">
              <h1 data-test-id="dashboard-welcome">Hi, {{ data.student.displayName }}! 👋</h1>
              <div class="player-info">
                <span class="rank-tag" [attr.data-rank]="data.student.rank || 'E-Rank'">
                  {{ data.student.rank || 'E-Rank' }} Hunter
                </span>
                <div class="xp-container">
                  <div class="xp-bar">
                    <div class="xp-fill" [style.width.%]="getXPProgress(data.student.xp || 0)"></div>
                  </div>
                  <span class="xp-text">XP {{ data.student.xp || 0 }} / {{ getNextLevelXP(data.student.level || 1) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Daily Quest Timer -->
          <div class="daily-quest-timer" [class.warning]="isPenaltyWarning()">
            <div class="timer-label">DAILY QUEST</div>
            <div class="timer-value">{{ timeRemaining }}</div>
            @if (isPenaltyWarning()) {
              <div class="penalty-warning">⚠️ PENALTY WARNING</div>
            }
          </div>
        </header>

        <!-- Stats Cards -->
        <section class="stats-section" data-test-id="dashboard-stats">
          <div class="stat-card stat-points">
            <span class="stat-icon">⭐</span>
            <div class="stat-content">
              <span class="stat-value">{{ data.totalPoints }}</span>
              <span class="stat-label">Total Points</span>
            </div>
          </div>
          <div class="stat-card stat-streak">
            <span class="stat-icon">🔥</span>
            <div class="stat-content">
              <span class="stat-value">{{ data.stats.longestStreak }}</span>
              <span class="stat-label">Best Streak</span>
            </div>
          </div>
          <div class="stat-card stat-campaigns">
            <span class="stat-icon">📋</span>
            <div class="stat-content">
              <span class="stat-value">{{ data.stats.activeCampaigns }}</span>
              <span class="stat-label">Active Campaigns</span>
            </div>
          </div>
          <div class="stat-card stat-badges">
            <span class="stat-icon">🏅</span>
            <div class="stat-content">
              <span class="stat-value">{{ data.stats.totalBadges }}</span>
              <span class="stat-label">Badges</span>
            </div>
          </div>
        </section>

        <!-- My Campaigns -->
        <section class="campaigns-section">
          <div class="section-header">
            <h2>My Campaigns</h2>
            <a routerLink="/campaigns" class="btn btn-outline btn-sm" data-test-id="browse-campaigns-button">
              Browse More
            </a>
          </div>
          
          @if (data.enrolledCampaigns.length === 0) {
            <div class="empty-state card">
              <span class="empty-icon">🎯</span>
              <h3>No campaigns yet!</h3>
              <p class="text-muted">Join a campaign to start building healthy habits.</p>
              <a routerLink="/campaigns" class="btn btn-primary">Find Campaigns</a>
            </div>
          } @else {
            <div class="campaigns-grid" data-test-id="enrolled-campaigns">
              @for (campaign of data.enrolledCampaigns; track campaign.id) {
                <div class="campaign-card card-elevated" [attr.data-test-id]="'enrolled-campaign-' + campaign.id">
                  <div class="campaign-header">
                    <h3>{{ campaign.title }}</h3>
                    <span class="streak-badge" [class.active]="(campaign.streak?.currentStreak || 0) > 0">
                      🔥 {{ campaign.streak?.currentStreak || 0 }}
                    </span>
                  </div>
                  <p class="campaign-habits">{{ campaign.habits?.length || 0 }} daily habits</p>
                  
                  <div class="campaign-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" [style.width.%]="getProgress(campaign)"></div>
                    </div>
                  </div>
                  
                  <div class="campaign-actions">
                    <a 
                      [routerLink]="['/student/submit', campaign.id]" 
                      class="btn btn-primary"
                      [attr.data-test-id]="'submit-button-' + campaign.id"
                    >
                      Submit Today
                    </a>
                    <a 
                      [routerLink]="['/campaigns', campaign.id]" 
                      class="btn btn-outline"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              }
            </div>
          }
        </section>

        <!-- Badges -->
        @if (data.badges.length > 0) {
          <section class="badges-section">
            <h2>My Badges 🏆</h2>
            <div class="badges-grid" data-test-id="student-badges">
              @for (badge of data.badges; track badge.id) {
                <div class="badge-card" [attr.data-test-id]="'badge-' + badge.badgeType">
                  <span class="badge-icon">{{ getBadgeIcon(badge.badgeType) }}</span>
                  <span class="badge-name">{{ getBadgeName(badge.badgeType) }}</span>
                </div>
              }
            </div>
          </section>
        }
      }
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: var(--max-width-xl);
      margin: 0 auto;
    }
    
    .loading-state {
      text-align: center;
      padding: var(--spacing-3xl);
    }
    
    /* Header */
    .dashboard-header {
      margin-bottom: var(--spacing-xl);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-lg);
      border-radius: var(--radius-lg);
      background: var(--color-snow);
      border: 1px solid transparent;
      transition: all 0.3s ease;
    }

    /* Rank Themes */
    .dashboard-header[data-rank="S-Rank"] {
      background: linear-gradient(135deg, #fff9c4 0%, #fff 100%);
      border-color: #FFD700;
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
    }
    .dashboard-header[data-rank="A-Rank"] {
      background: linear-gradient(135deg, #f5f5f5 0%, #fff 100%);
      border-color: #C0C0C0;
      box-shadow: 0 4px 15px rgba(192, 192, 192, 0.2);
    }
    .dashboard-header[data-rank="B-Rank"] {
      border-left: 4px solid #CD7F32;
    }
    .dashboard-header[data-rank="C-Rank"] {
      border-left: 4px solid #9b59b6;
    }
    .dashboard-header[data-rank="D-Rank"] {
      border-left: 4px solid #3498db;
    }
    .dashboard-header[data-rank="E-Rank"] {
      border-left: 4px solid #95a5a6;
    }
    
    .welcome-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
    }

    /* Daily Quest Timer */
    .daily-quest-timer {
      text-align: right;
      padding: var(--spacing-sm) var(--spacing-md);
      background: rgba(0, 0, 0, 0.05);
      border-radius: var(--radius-md);
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .daily-quest-timer.warning {
      background: rgba(231, 76, 60, 0.1);
      border-color: #e74c3c;
      animation: pulse 2s infinite;
    }

    .timer-label {
      font-size: 10px;
      font-weight: bold;
      letter-spacing: 1px;
      color: var(--color-wolf);
      margin-bottom: 2px;
    }

    .timer-value {
      font-family: monospace;
      font-size: var(--font-size-xl);
      font-weight: bold;
      color: var(--color-eel);
    }

    .warning .timer-value {
      color: #e74c3c;
    }

    .penalty-warning {
      font-size: 10px;
      color: #e74c3c;
      font-weight: bold;
      margin-top: 2px;
      animation: blink 1s infinite;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(231, 76, 60, 0); }
      100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
    }

    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    
    .avatar-container {
      position: relative;
    }
    
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: var(--radius-circle);
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
      border: 4px solid white;
      box-shadow: var(--shadow-md);
    }

    .level-badge {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 28px;
      height: 28px;
      background: var(--color-eel);
      color: white;
      border-radius: var(--radius-circle);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: var(--font-size-sm);
      border: 2px solid white;
    }

    .level-badge[data-rank="S-Rank"] { background: #FFD700; color: black; }
    .level-badge[data-rank="A-Rank"] { background: #C0C0C0; color: black; }
    .level-badge[data-rank="B-Rank"] { background: #CD7F32; }
    .level-badge[data-rank="C-Rank"] { background: #9b59b6; }
    .level-badge[data-rank="D-Rank"] { background: #3498db; }
    .level-badge[data-rank="E-Rank"] { background: #95a5a6; }
    
    .welcome-text h1 {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--spacing-xs);
    }

    .player-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    .rank-tag {
      display: inline-block;
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      font-size: var(--font-size-xs);
      font-weight: bold;
      text-transform: uppercase;
      width: fit-content;
    }

    .rank-tag[data-rank="S-Rank"] { background: #FFD700; color: black; }
    .rank-tag[data-rank="A-Rank"] { background: #C0C0C0; color: black; }
    .rank-tag[data-rank="B-Rank"] { background: #CD7F32; color: white; }
    .rank-tag[data-rank="C-Rank"] { background: #9b59b6; color: white; }
    .rank-tag[data-rank="D-Rank"] { background: #3498db; color: white; }
    .rank-tag[data-rank="E-Rank"] { background: #95a5a6; color: white; }

    .xp-container {
      width: 200px;
    }

    .xp-bar {
      height: 6px;
      background: var(--color-hare);
      border-radius: var(--radius-pill);
      overflow: hidden;
      margin-bottom: 2px;
    }

    .xp-fill {
      height: 100%;
      background: linear-gradient(90deg, #3498db, #2ecc71);
      border-radius: var(--radius-pill);
      transition: width 0.5s ease-out;
    }

    .xp-text {
      font-size: 10px;
      color: var(--color-wolf);
      font-weight: 600;
    }
    
    /* Stats */
    .stats-section {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-xl);
    }
    
    .stat-card {
      background: var(--color-snow);
      padding: var(--spacing-lg);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      box-shadow: var(--shadow-sm);
    }
    
    .stat-icon {
      font-size: 36px;
    }
    
    .stat-content {
      display: flex;
      flex-direction: column;
    }
    
    .stat-value {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      line-height: 1;
    }
    
    .stat-label {
      font-size: var(--font-size-sm);
      color: var(--color-wolf);
    }
    
    .stat-points .stat-value { color: var(--color-bee); }
    .stat-streak .stat-value { color: var(--color-fox); }
    .stat-campaigns .stat-value { color: var(--color-secondary); }
    .stat-badges .stat-value { color: var(--color-beetle); }
    
    /* Campaigns */
    .campaigns-section {
      margin-bottom: var(--spacing-xl);
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-md);
    }
    
    .campaigns-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--spacing-md);
    }
    
    .campaign-card {
      padding: var(--spacing-lg);
    }
    
    .campaign-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-sm);
    }
    
    .campaign-header h3 {
      font-size: var(--font-size-lg);
      flex: 1;
    }
    
    .streak-badge {
      padding: 4px 10px;
      background: var(--color-swan);
      border-radius: var(--radius-pill);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
    }
    
    .streak-badge.active {
      background: var(--color-fox);
      color: white;
    }
    
    .campaign-habits {
      font-size: var(--font-size-sm);
      color: var(--color-wolf);
      margin-bottom: var(--spacing-md);
    }
    
    .campaign-progress {
      margin-bottom: var(--spacing-md);
    }
    
    .progress-bar {
      height: 8px;
      background: var(--color-swan);
      border-radius: var(--radius-pill);
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: var(--color-primary);
      border-radius: var(--radius-pill);
      transition: width var(--transition-normal);
    }
    
    .campaign-actions {
      display: flex;
      gap: var(--spacing-sm);
    }
    
    .campaign-actions .btn {
      flex: 1;
    }
    
    /* Empty State */
    .empty-state {
      text-align: center;
      padding: var(--spacing-2xl);
    }
    
    .empty-icon {
      font-size: 48px;
      display: block;
      margin-bottom: var(--spacing-md);
    }
    
    .empty-state h3 {
      margin-bottom: var(--spacing-xs);
    }
    
    .empty-state p {
      margin-bottom: var(--spacing-md);
    }
    
    /* Badges */
    .badges-section {
      margin-bottom: var(--spacing-xl);
    }
    
    .badges-section h2 {
      margin-bottom: var(--spacing-md);
    }
    
    .badges-grid {
      display: flex;
      gap: var(--spacing-md);
      flex-wrap: wrap;
    }
    
    .badge-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--spacing-md);
      background: var(--color-snow);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      min-width: 100px;
    }
    
    .badge-icon {
      font-size: 36px;
      margin-bottom: var(--spacing-xs);
    }
    
    .badge-name {
      font-size: var(--font-size-xs);
      text-align: center;
      color: var(--color-wolf);
    }
    
    @media (max-width: 1024px) {
      .stats-section {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .stats-section {
        grid-template-columns: 1fr 1fr;
      }
      
      .campaigns-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class StudentDashboardComponent implements OnInit, OnDestroy {
  data: StudentDashboardData | null = null;
  loading = true;
  timeRemaining: string = '00:00:00';
  private timerInterval: any;

  constructor(private http: HttpClient, public authService: AuthService) { }

  ngOnInit(): void {
    this.loadDashboard();
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer(): void {
    this.updateTimer();
    this.timerInterval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  updateTimer(): void {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    
    const diff = midnight.getTime() - now.getTime();
    
    if (diff <= 0) {
      this.timeRemaining = '00:00:00';
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.timeRemaining = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  isPenaltyWarning(): boolean {
    const now = new Date();
    // Warning if less than 4 hours remaining (after 8 PM)
    return now.getHours() >= 20;
  }

  loadDashboard(): void {
    this.http.get<ApiResponse<StudentDashboardData>>(`${environment.apiUrl}/dashboard/student`).subscribe({
      next: (response) => {
        if (response.success) {
          this.data = response.data;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  getNextLevelXP(level: number): number {
    // Inverse of Level = sqrt(XP / 100) + 1
    // XP = ((Level - 1) ^ 2) * 100
    // Next Level XP = (Level ^ 2) * 100
    return Math.pow(level, 2) * 100;
  }

  getXPProgress(currentXP: number): number {
    const level = Math.floor(Math.sqrt(currentXP / 100)) + 1;
    const currentLevelBaseXP = Math.pow(level - 1, 2) * 100;
    const nextLevelXP = Math.pow(level, 2) * 100;
    const levelXP = nextLevelXP - currentLevelBaseXP;
    const progressXP = currentXP - currentLevelBaseXP;
    
    return Math.min(100, Math.max(0, (progressXP / levelXP) * 100));
  }

  shouldShowParticles(): boolean {
    const rank = this.data?.student.rank || 'E-Rank';
    return ['A-Rank', 'S-Rank', 'National Level'].includes(rank);
  }

  getProgress(campaign: Campaign): number {
    // Calculate progress based on days elapsed vs total campaign days
    if (!campaign.startDate || !campaign.endDate) return 0;
    const start = new Date(campaign.startDate).getTime();
    const end = new Date(campaign.endDate).getTime();
    const now = Date.now();
    const progress = ((now - start) / (end - start)) * 100;
    return Math.min(100, Math.max(0, progress));
  }

  getBadgeIcon(type: string): string {
    const icons: Record<string, string> = {
      '7_day_streak': '🔥',
      '30_day_streak': '🌟',
      '100_day_streak': '💎',
      'campaign_completer': '🏆',
      'top_3_finisher': '🥇',
      'generous_heart': '💝',
    };
    return icons[type] || '🏅';
  }

  getBadgeName(type: string): string {
    const names: Record<string, string> = {
      '7_day_streak': '7-Day Streak',
      '30_day_streak': '30-Day Streak',
      '100_day_streak': '100-Day Streak',
      'campaign_completer': 'Campaign Hero',
      'top_3_finisher': 'Top 3 Finisher',
      'generous_heart': 'Generous Heart',
    };
    return names[type] || type;
  }
}
