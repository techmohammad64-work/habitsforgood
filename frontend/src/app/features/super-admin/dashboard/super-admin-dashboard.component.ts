import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

interface Stats {
  users: { total: number; students: number; admins: number; sponsors: number; newLast30Days: number };
  campaigns: { total: number; active: number; newLast30Days: number };
  activity: { totalSubmissions: number; completedSubmissions: number };
  financials: { totalPledged: string; totalRemaining: string; activeSponsors: number };
}

interface Analytics {
  demographics: Record<string, number>;
  popularTags: { tag: string; count: number }[];
}

interface Teacher {
  id: number;
  name: string;
  organization: string;
  email: string;
  campaignCount: number;
  activeCampaigns: number;
  totalStudents: number;
  createdAt: string;
}

interface GrowthMetrics {
  userGrowth: { date: string; count: number }[];
  campaignGrowth: { date: string; count: number }[];
}

interface Sponsor {
  id: number;
  name: string;
  email: string;
  totalPledged: string;
  activePledges: number;
  totalPledges: number;
}

interface EngagementMetrics {
  popularCampaigns: { id: number; title: string; enrollments: number; status: string }[];
  topStudents: { id: number; displayName: string; xp: number; level: number; rank: string }[];
}

interface AuditLog {
  id: number;
  action: string;
  user?: { id: number; email: string; role: string };
  entityType?: string;
  entityId?: number;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

interface ActivityMetrics {
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  recentActivity: number;
}

interface GeographicData {
  hotZones: { region: string; studentCount: number }[];
  topCities: { city: string; studentCount: number }[];
  topStates: { state: string; studentCount: number }[];
  regionDistribution: Record<string, number>;
  campaignsByRegion: Record<string, number>;
}

interface RegionalEngagement {
  region: string;
  totalStudents: number;
  totalEnrollments: number;
  totalSubmissions: number;
  averageXp: number;
  engagementRate: string;
}

@Component({
  selector: 'app-super-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Super Admin Dashboard</h1>
        <p class="text-muted">Platform Overview & Analytics</p>
      </header>

      @if (loading) {
        <div class="loading-state">
          <div class="spinner"></div>
        </div>
      } @else {
        <!-- KPI Cards -->
        <section class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-icon">👥</div>
            <div class="kpi-value">{{ stats?.users?.total || 0 }}</div>
            <div class="kpi-label">Total Users</div>
            <div class="kpi-sub">
              {{ stats?.users?.students || 0 }} Students • {{ stats?.users?.admins || 0 }} Teachers • {{ stats?.users?.sponsors || 0 }} Sponsors
            </div>
            <div class="kpi-growth">+{{ stats?.users?.newLast30Days || 0 }} in last 30 days</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-icon">🚀</div>
            <div class="kpi-value">{{ stats?.campaigns?.active || 0 }}</div>
            <div class="kpi-label">Active Campaigns</div>
            <div class="kpi-sub">Out of {{ stats?.campaigns?.total || 0 }} total</div>
            <div class="kpi-growth">+{{ stats?.campaigns?.newLast30Days || 0 }} in last 30 days</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon">✅</div>
            <div class="kpi-value">{{ getEngagementRate() }}%</div>
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-sub">
              {{ stats?.activity?.completedSubmissions || 0 }} / {{ stats?.activity?.totalSubmissions || 0 }} submissions
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon">💰</div>
            <div class="kpi-value">\${{ stats?.financials?.totalPledged || 0 }}</div>
            <div class="kpi-label">Total Pledged</div>
            <div class="kpi-sub">{{ stats?.financials?.activeSponsors || 0 }} active sponsors</div>
            <div class="kpi-growth">\${{ stats?.financials?.totalRemaining || 0 }} remaining</div>
          </div>
        </section>

        <div class="dashboard-content">
          <!-- Growth Charts -->
          <div class="growth-section">
            <div class="card">
              <h3>📈 User Growth (Last 30 Days)</h3>
              <div class="mini-chart">
                @for (point of growthMetrics?.userGrowth || []; track point.date) {
                  <div class="chart-bar" [style.height.px]="point.count * 10" [title]="point.date + ': ' + point.count + ' users'"></div>
                }
              </div>
            </div>

            <div class="card">
              <h3>📊 Campaign Growth (Last 30 Days)</h3>
              <div class="mini-chart">
                @for (point of growthMetrics?.campaignGrowth || []; track point.date) {
                  <div class="chart-bar" [style.height.px]="point.count * 15" [title]="point.date + ': ' + point.count + ' campaigns'"></div>
                }
              </div>
            </div>
          </div>

          <!-- Top Sponsors & Popular Campaigns -->
          <div class="insights-section">
            <div class="card">
              <h3>💎 Top Sponsors</h3>
              <div class="list-container">
                @for (sponsor of sponsors.slice(0, 5); track sponsor.id) {
                  <div class="list-item">
                    <div class="item-info">
                      <div class="item-name">{{ sponsor.name }}</div>
                      <div class="item-sub">{{ sponsor.email }}</div>
                    </div>
                    <div class="item-value">\${{ sponsor.totalPledged }}</div>
                  </div>
                }
              </div>
            </div>

            <div class="card">
              <h3>🔥 Most Popular Campaigns</h3>
              <div class="list-container">
                @for (campaign of engagement?.popularCampaigns || []; track campaign.id) {
                  <div class="list-item">
                    <div class="item-info">
                      <div class="item-name">{{ campaign.title }}</div>
                      <span class="badge" [class.badge-success]="campaign.status === 'active'">{{ campaign.status }}</span>
                    </div>
                    <div class="item-value">{{ campaign.enrollments }} students</div>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Top Students Leaderboard -->
          <div class="card">
            <h3>🏆 Platform Leaderboard - Top Students</h3>
            <div class="leaderboard-grid">
              @for (student of engagement?.topStudents || []; track student.id) {
                <div class="leaderboard-item">
                  <div class="rank-badge" [attr.data-rank]="student.rank">{{ student.level }}</div>
                  <div class="student-info">
                    <div class="student-name">{{ student.displayName }}</div>
                    <div class="student-rank">{{ student.rank }}</div>
                  </div>
                  <div class="student-xp">{{ student.xp }} XP</div>
                </div>
              }
            </div>
          </div>

          <!-- Activity Metrics -->
          <div class="activity-section">
            <div class="card">
              <h3>📱 Platform Activity</h3>
              <div class="activity-stats">
                <div class="activity-stat">
                  <div class="activity-icon">📅</div>
                  <div class="activity-value">{{ activityMetrics?.dailyActiveUsers || 0 }}</div>
                  <div class="activity-label">Daily Active Users</div>
                </div>
                <div class="activity-stat">
                  <div class="activity-icon">📊</div>
                  <div class="activity-value">{{ activityMetrics?.weeklyActiveUsers || 0 }}</div>
                  <div class="activity-label">Weekly Active Users</div>
                </div>
                <div class="activity-stat">
                  <div class="activity-icon">⚡</div>
                  <div class="activity-value">{{ activityMetrics?.recentActivity || 0 }}</div>
                  <div class="activity-label">Actions (24h)</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Audit Logs -->
          <div class="card">
            <h3>🔒 Recent Activity Logs</h3>
            <div class="audit-logs">
              @for (log of auditLogs.slice(0, 10); track log.id) {
                <div class="audit-log-item">
                  <div class="log-icon" [class.log-warning]="log.action.includes('UNAUTHORIZED')">
                    {{ log.action.includes('UNAUTHORIZED') ? '⚠️' : '📝' }}
                  </div>
                  <div class="log-content">
                    <div class="log-action">{{ log.action }}</div>
                    <div class="log-details">
                      {{ log.user?.email || 'System' }} • {{ formatDate(log.createdAt) }}
                      @if (log.ipAddress) {
                        <span class="log-ip">from {{ log.ipAddress }}</span>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Geographic Data -->
          <div class="geographic-section">
            <div class="card">
              <h3>🌍 Hot Zones (Top Regions)</h3>
              <div class="hotzone-list">
                @for (zone of geographicData?.hotZones || []; track zone.region) {
                  <div class="hotzone-item">
                    <div class="hotzone-region">{{ zone.region }}</div>
                    <div class="hotzone-count">{{ zone.studentCount }} students</div>
                  </div>
                }
              </div>
            </div>

            <div class="card">
              <h3>🏙️ Top Cities</h3>
              <div class="city-list">
                @for (city of (geographicData?.topCities || []).slice(0, 5); track city.city) {
                  <div class="city-item">
                    <span class="city-name">{{ city.city }}</span>
                    <span class="city-count">{{ city.studentCount }}</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Regional Engagement -->
          <div class="card">
            <h3>📊 Regional Engagement Metrics</h3>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Students</th>
                    <th>Enrollments</th>
                    <th>Submissions</th>
                    <th>Avg XP</th>
                    <th>Engagement Rate</th>
                  </tr>
                </thead>
                <tbody>
                  @for (region of regionalEngagement; track region.region) {
                    <tr>
                      <td><strong>{{ region.region }}</strong></td>
                      <td>{{ region.totalStudents }}</td>
                      <td>{{ region.totalEnrollments }}</td>
                      <td>{{ region.totalSubmissions }}</td>
                      <td>{{ region.averageXp }}</td>
                      <td>
                        <span class="badge badge-success">{{ region.engagementRate }}%</span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          <!-- Analytics Section -->
          <div class="analytics-section">
            <div class="card">
              <h3>📊 Demographics</h3>
              <div class="chart-container">
                @for (group of getDemographicGroups(); track group.key) {
                  <div class="bar-row">
                    <span class="bar-label">{{ group.key }} yrs</span>
                    <div class="bar-track">
                      <div class="bar-fill" [style.width.%]="getDemographicPercentage(group.value)"></div>
                    </div>
                    <span class="bar-value">{{ group.value }}</span>
                  </div>
                }
              </div>
            </div>

            <div class="card">
              <h3>🔥 Popular Keywords</h3>
              <div class="tags-cloud">
                @for (tag of analytics?.popularTags; track tag.tag) {
                  <div class="tag-item">
                    <span class="tag-name">#{{ tag.tag }}</span>
                    <span class="tag-count">{{ tag.count }}</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Teachers Table -->
          <div class="teachers-section card">
            <h3>👨‍🏫 Teacher Performance</h3>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Organization</th>
                    <th>Email</th>
                    <th>Total Students</th>
                    <th>Total Campaigns</th>
                    <th>Active</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  @for (teacher of teachers; track teacher.id) {
                    <tr>
                      <td>
                        <div class="teacher-info">
                          <div class="avatar-circle">{{ teacher.name.charAt(0) }}</div>
                          <span>{{ teacher.name }}</span>
                        </div>
                      </td>
                      <td>{{ teacher.organization || '-' }}</td>
                      <td class="text-sm">{{ teacher.email }}</td>
                      <td>{{ teacher.totalStudents }}</td>
                      <td>{{ teacher.campaignCount }}</td>
                      <td>{{ teacher.activeCampaigns }}</td>
                      <td>
                        <span class="badge" [class.badge-success]="teacher.activeCampaigns > 0">
                          {{ teacher.activeCampaigns > 0 ? 'Active' : 'Inactive' }}
                        </span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: var(--max-width-xl);
      margin: 0 auto;
      padding-bottom: var(--spacing-2xl);
    }

    .dashboard-header {
      margin-bottom: var(--spacing-xl);
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }

    .kpi-card {
      background: var(--color-snow);
      padding: var(--spacing-lg);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--color-hare);
    }

    .kpi-icon { font-size: 32px; margin-bottom: var(--spacing-sm); }
    .kpi-value { font-size: 32px; font-weight: bold; color: var(--color-eel); line-height: 1; margin-bottom: 4px; }
    .kpi-label { font-size: var(--font-size-sm); font-weight: bold; color: var(--color-wolf); text-transform: uppercase; letter-spacing: 0.5px; }
    .kpi-sub { font-size: var(--font-size-xs); color: var(--color-wolf); margin-top: var(--spacing-xs); }
    .kpi-growth { font-size: var(--font-size-xs); color: var(--color-primary); font-weight: 600; margin-top: 4px; }

    .dashboard-content {
      display: grid;
      gap: var(--spacing-xl);
    }

    /* Growth Charts */
    .growth-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-lg);
    }

    .mini-chart {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      height: 60px;
      margin-top: var(--spacing-md);
    }

    .chart-bar {
      flex: 1;
      background: var(--color-primary);
      border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      min-height: 4px;
      transition: all var(--transition-fast);
      cursor: pointer;
    }

    .chart-bar:hover {
      background: var(--color-primary-hover);
    }

    /* Insights */
    .insights-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: var(--spacing-lg);
    }

    .list-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-sm);
      background: var(--color-swan);
      border-radius: var(--radius-md);
    }

    .item-info { flex: 1; }
    .item-name { font-weight: 600; font-size: var(--font-size-sm); }
    .item-sub { font-size: var(--font-size-xs); color: var(--color-wolf); }
    .item-value { font-weight: bold; color: var(--color-primary); }

    /* Leaderboard */
    .leaderboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--spacing-md);
      margin-top: var(--spacing-md);
    }

    .leaderboard-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm);
      background: var(--color-swan);
      border-radius: var(--radius-md);
    }

    .rank-badge {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-circle);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: var(--font-size-sm);
      color: white;
      background: var(--color-eel);
    }

    .rank-badge[data-rank="S-Rank"] { background: #FFD700; color: black; }
    .rank-badge[data-rank="A-Rank"] { background: #C0C0C0; color: black; }
    .rank-badge[data-rank="B-Rank"] { background: #CD7F32; }
    .rank-badge[data-rank="C-Rank"] { background: #9b59b6; }
    .rank-badge[data-rank="D-Rank"] { background: #3498db; }
    .rank-badge[data-rank="E-Rank"] { background: #95a5a6; }

    .student-info { flex: 1; }
    .student-name { font-weight: 600; font-size: var(--font-size-sm); }
    .student-rank { font-size: var(--font-size-xs); color: var(--color-wolf); }
    .student-xp { font-weight: bold; font-size: var(--font-size-xs); color: var(--color-primary); }

    /* Activity Section */
    .activity-section {
      margin-top: var(--spacing-lg);
    }

    .activity-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--spacing-md);
      margin-top: var(--spacing-md);
    }

    .activity-stat {
      text-align: center;
      padding: var(--spacing-md);
      background: var(--color-swan);
      border-radius: var(--radius-md);
    }

    .activity-icon { font-size: 28px; margin-bottom: var(--spacing-xs); }
    .activity-value { font-size: 24px; font-weight: bold; color: var(--color-primary); }
    .activity-label { font-size: var(--font-size-xs); color: var(--color-wolf); margin-top: 4px; }

    /* Audit Logs */
    .audit-logs {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      max-height: 400px;
      overflow-y: auto;
    }

    .audit-log-item {
      display: flex;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm);
      background: var(--color-swan);
      border-radius: var(--radius-md);
      border-left: 3px solid var(--color-primary);
    }

    .audit-log-item.log-warning {
      border-left-color: #e74c3c;
      background: rgba(231, 76, 60, 0.05);
    }

    .log-icon {
      font-size: 18px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-snow);
      border-radius: var(--radius-circle);
    }

    .log-content { flex: 1; }
    .log-action { font-weight: 600; font-size: var(--font-size-sm); color: var(--color-eel); }
    .log-details { font-size: var(--font-size-xs); color: var(--color-wolf); margin-top: 2px; }
    .log-ip { font-style: italic; color: var(--color-wolf); opacity: 0.7; }

    /* Geographic Section */
    .geographic-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
    }

    .hotzone-list, .city-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .hotzone-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-sm) var(--spacing-md);
      background: linear-gradient(135deg, var(--color-sky) 0%, var(--color-swan) 100%);
      border-radius: var(--radius-md);
      border-left: 4px solid var(--color-primary);
    }

    .hotzone-region {
      font-weight: 600;
      font-size: var(--font-size-md);
      color: var(--color-eel);
    }

    .hotzone-count {
      font-weight: 600;
      color: var(--color-primary);
    }

    .city-item {
      display: flex;
      justify-content: space-between;
      padding: var(--spacing-xs) var(--spacing-sm);
      border-bottom: 1px solid var(--color-hare);
    }

    .city-name { font-weight: 500; }
    .city-count { 
      background: var(--color-primary); 
      color: white; 
      padding: 2px 8px; 
      border-radius: var(--radius-pill); 
      font-size: var(--font-size-xs); 
      font-weight: 600;
    }

    .analytics-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-lg);
    }

    .card {
      background: var(--color-snow);
      padding: var(--spacing-lg);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--color-hare);
    }

    h3 { margin-bottom: var(--spacing-lg); font-size: var(--font-size-lg); }

    /* Demographics Chart */
    .bar-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-sm);
    }
    .bar-label { width: 80px; font-size: var(--font-size-sm); color: var(--color-wolf); }
    .bar-track { flex: 1; height: 8px; background: var(--color-swan); border-radius: var(--radius-pill); overflow: hidden; }
    .bar-fill { height: 100%; background: var(--color-primary); border-radius: var(--radius-pill); }
    .bar-value { width: 30px; text-align: right; font-weight: bold; font-size: var(--font-size-sm); }

    /* Tags */
    .tags-cloud { display: flex; flex-wrap: wrap; gap: var(--spacing-sm); }
    .tag-item { 
      display: flex; align-items: center; gap: 6px;
      padding: 6px 12px; background: var(--color-swan); 
      border-radius: var(--radius-pill); font-size: var(--font-size-sm);
    }
    .tag-count { 
      background: var(--color-wolf); color: white; 
      padding: 2px 6px; border-radius: var(--radius-pill); font-size: 10px; 
    }

    /* Table */
    .table { width: 100%; border-collapse: collapse; }
    .table th { text-align: left; padding: var(--spacing-sm); color: var(--color-wolf); font-size: var(--font-size-xs); text-transform: uppercase; border-bottom: 2px solid var(--color-hare); }
    .table td { padding: var(--spacing-md) var(--spacing-sm); border-bottom: 1px solid var(--color-hare); }
    .teacher-info { display: flex; align-items: center; gap: var(--spacing-sm); font-weight: 500; }
    .avatar-circle { 
      width: 32px; height: 32px; background: var(--color-primary); 
      color: white; border-radius: 50%; display: flex; 
      align-items: center; justify-content: center; font-weight: bold; 
    }
    .text-sm { font-size: var(--font-size-xs); color: var(--color-wolf); }
  `]
})
export class SuperAdminDashboardComponent implements OnInit {
  stats: Stats | null = null;
  analytics: Analytics | null = null;
  teachers: Teacher[] = [];
  growthMetrics: GrowthMetrics | null = null;
  sponsors: Sponsor[] = [];
  engagement: EngagementMetrics | null = null;
  auditLogs: AuditLog[] = [];
  activityMetrics: ActivityMetrics | null = null;
  geographicData: GeographicData | null = null;
  regionalEngagement: RegionalEngagement[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Parallel requests
    const statsReq = this.http.get<{success: boolean, data: Stats}>(`${environment.apiUrl}/super-admin/stats`);
    const analyticsReq = this.http.get<{success: boolean, data: Analytics}>(`${environment.apiUrl}/super-admin/analytics`);
    const teachersReq = this.http.get<{success: boolean, data: Teacher[]}>(`${environment.apiUrl}/super-admin/teachers`);
    const growthReq = this.http.get<{success: boolean, data: GrowthMetrics}>(`${environment.apiUrl}/super-admin/growth`);
    const sponsorsReq = this.http.get<{success: boolean, data: Sponsor[]}>(`${environment.apiUrl}/super-admin/sponsors`);
    const engagementReq = this.http.get<{success: boolean, data: EngagementMetrics}>(`${environment.apiUrl}/super-admin/engagement`);
    const auditLogsReq = this.http.get<{success: boolean, data: AuditLog[]}>(`${environment.apiUrl}/super-admin/audit-logs?limit=50`);
    const activityReq = this.http.get<{success: boolean, data: ActivityMetrics}>(`${environment.apiUrl}/super-admin/activity`);
    const geographicReq = this.http.get<{success: boolean, data: GeographicData}>(`${environment.apiUrl}/super-admin/geographic`);
    const regionalEngagementReq = this.http.get<{success: boolean, data: RegionalEngagement[]}>(`${environment.apiUrl}/super-admin/regional-engagement`);

    statsReq.subscribe(res => {
      if (res.success) this.stats = res.data;
      this.checkLoading();
    });

    analyticsReq.subscribe(res => {
      if (res.success) this.analytics = res.data;
      this.checkLoading();
    });

    teachersReq.subscribe(res => {
      if (res.success) this.teachers = res.data;
      this.checkLoading();
    });

    growthReq.subscribe(res => {
      if (res.success) this.growthMetrics = res.data;
      this.checkLoading();
    });

    sponsorsReq.subscribe(res => {
      if (res.success) this.sponsors = res.data;
      this.checkLoading();
    });

    engagementReq.subscribe(res => {
      if (res.success) this.engagement = res.data;
      this.checkLoading();
    });

    auditLogsReq.subscribe(res => {
      if (res.success) this.auditLogs = res.data;
      this.checkLoading();
    });

    activityReq.subscribe(res => {
      if (res.success) this.activityMetrics = res.data;
      this.checkLoading();
    });

    geographicReq.subscribe(res => {
      if (res.success) this.geographicData = res.data;
      this.checkLoading();
    });

    regionalEngagementReq.subscribe(res => {
      if (res.success) this.regionalEngagement = res.data;
      this.checkLoading();
    });
  }

  checkLoading() {
    if (this.stats && this.analytics && this.teachers && this.growthMetrics && 
        this.sponsors && this.engagement && this.auditLogs && this.activityMetrics &&
        this.geographicData && this.regionalEngagement) {
      this.loading = false;
    }
  }

  getEngagementRate(): number {
    if (!this.stats?.activity?.totalSubmissions) return 0;
    return Math.round((this.stats.activity.completedSubmissions / this.stats.activity.totalSubmissions) * 100);
  }

  getDemographicGroups() {
    if (!this.analytics?.demographics) return [];
    return Object.entries(this.analytics.demographics).map(([key, value]) => ({ key, value }));
  }

  getDemographicPercentage(value: number): number {
    const total = this.stats?.users?.students || 1;
    return (value / total) * 100;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }
}
