import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CampaignService, Campaign } from '@core/services/campaign.service';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="campaigns-page">
      <header class="page-header">
        <h1 data-test-id="campaigns-title">Explore Campaigns</h1>
        <p class="text-muted">Find a cause you care about and start building healthy habits!</p>
      </header>

      <!-- Filters -->
      <div class="filters" data-test-id="campaign-filters">
        <button 
          class="filter-btn" 
          [class.active]="activeFilter === 'all'"
          (click)="filterCampaigns('all')"
        >All</button>
        <button 
          class="filter-btn" 
          [class.active]="activeFilter === 'active'"
          (click)="filterCampaigns('active')"
        >Active</button>
        <button 
          class="filter-btn" 
          [class.active]="activeFilter === 'upcoming'"
          (click)="filterCampaigns('upcoming')"
        >Upcoming</button>
      </div>

      @if (loading) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading campaigns...</p>
        </div>
      } @else if (filteredCampaigns.length === 0) {
        <div class="empty-state">
          <span class="empty-emoji">🔍</span>
          <h3>No campaigns found</h3>
          <p class="text-muted">Check back later for new campaigns!</p>
        </div>
      } @else {
        <div class="campaigns-grid" data-test-id="campaigns-grid">
          @for (campaign of filteredCampaigns; track campaign.id) {
            <article class="campaign-card card-elevated" [attr.data-test-id]="'campaign-card-' + campaign.id">
              <div class="card-header">
                <span class="badge" [class]="getStatusBadgeClass(campaign.status)">
                  {{ campaign.status }}
                </span>
                @if (campaign.featured) {
                  <span class="badge badge-warning">⭐ Featured</span>
                }
                @if (campaign.isSponsored) {
                  <span class="badge badge-primary">❤️ Sponsored</span>
                }
              </div>
              
              <h2 class="card-title">{{ campaign.title }}</h2>
              <p class="card-description">{{ campaign.description | slice:0:120 }}...</p>
              
              <div class="card-meta">
                <div class="meta-item">
                  <span class="meta-icon">📅</span>
                  <span>{{ getDaysRemaining(campaign.endDate) }} days left</span>
                </div>
                <div class="meta-item">
                  <span class="meta-icon">👥</span>
                  <span>{{ campaign.enrollmentCount || 0 }} students</span>
                </div>
                <div class="meta-item">
                  <span class="meta-icon">✅</span>
                  <span>{{ campaign.habits.length || 0 }} habits</span>
                </div>
              </div>
              
              @if (campaign.categoryTags && campaign.categoryTags.length > 0) {
                <div class="card-tags">
                  @for (tag of campaign.categoryTags.slice(0, 3); track tag) {
                    <span class="tag">{{ tag }}</span>
                  }
                </div>
              }
              
              <a 
                [routerLink]="['/campaigns', campaign.id]" 
                class="btn btn-primary card-action"
                [attr.data-test-id]="'campaign-view-' + campaign.id"
              >
                View Campaign
              </a>
            </article>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .campaigns-page {
      max-width: var(--max-width-xl);
      margin: 0 auto;
    }
    
    .page-header {
      text-align: center;
      margin-bottom: var(--spacing-xl);
    }
    
    .page-header h1 {
      margin-bottom: var(--spacing-sm);
    }
    
    .filters {
      display: flex;
      gap: var(--spacing-sm);
      justify-content: center;
      margin-bottom: var(--spacing-xl);
      flex-wrap: wrap;
    }
    
    .filter-btn {
      padding: var(--spacing-sm) var(--spacing-lg);
      background: var(--color-snow);
      border: 2px solid var(--color-hare);
      border-radius: var(--radius-pill);
      font-family: var(--font-family);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-wolf);
      cursor: pointer;
      transition: all var(--transition-fast);
      
      &:hover {
        border-color: var(--color-eel);
        color: var(--color-eel);
      }
      
      &.active {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: var(--color-snow);
      }
    }
    
    .campaigns-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: var(--spacing-lg);
    }
    
    .campaign-card {
      padding: var(--spacing-lg);
      display: flex;
      flex-direction: column;
    }
    
    .card-header {
      display: flex;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
    }
    
    .card-title {
      font-size: var(--font-size-xl);
      margin-bottom: var(--spacing-sm);
    }
    
    .card-description {
      color: var(--color-wolf);
      font-size: var(--font-size-sm);
      margin-bottom: var(--spacing-md);
      flex-grow: 1;
    }
    
    .card-meta {
      display: flex;
      gap: var(--spacing-md);
      flex-wrap: wrap;
      margin-bottom: var(--spacing-md);
    }
    
    .meta-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: var(--font-size-sm);
      color: var(--color-wolf);
    }
    
    .card-tags {
      display: flex;
      gap: var(--spacing-xs);
      flex-wrap: wrap;
      margin-bottom: var(--spacing-md);
    }
    
    .tag {
      padding: 4px 10px;
      background: var(--color-swan);
      border-radius: var(--radius-pill);
      font-size: var(--font-size-xs);
      color: var(--color-wolf);
    }
    
    .card-action {
      margin-top: auto;
    }
    
    .loading-state, .empty-state {
      text-align: center;
      padding: var(--spacing-3xl);
    }
    
    .empty-emoji {
      font-size: 64px;
      display: block;
      margin-bottom: var(--spacing-md);
    }
    
    @media (max-width: 768px) {
      .campaigns-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  filteredCampaigns: Campaign[] = [];
  loading = true;
  activeFilter = 'all';

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.campaignService.getAllCampaigns().subscribe({
      next: (response) => {
        if (response.success) {
          this.campaigns = response.data;
          this.filterCampaigns(this.activeFilter);
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  filterCampaigns(filter: string): void {
    this.activeFilter = filter;
    if (filter === 'all') {
      this.filteredCampaigns = this.campaigns;
    } else {
      this.filteredCampaigns = this.campaigns.filter(c => c.status === filter);
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active': return 'badge badge-success';
      case 'upcoming': return 'badge badge-secondary';
      case 'ended': return 'badge badge-warning';
      default: return 'badge';
    }
  }

  getDaysRemaining(endDate: string): number {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }
}
