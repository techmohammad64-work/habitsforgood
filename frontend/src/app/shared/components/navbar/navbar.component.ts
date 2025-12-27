import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink],
    template: `
    <nav class="navbar" data-test-id="navbar">
      <div class="navbar-container">
        <a routerLink="/" class="navbar-brand" data-test-id="navbar-logo">
          <span class="logo-icon">🌱</span>
          <span class="logo-text">Habits for Good</span>
        </a>
        
        <div class="navbar-links">
          <a routerLink="/campaigns" class="nav-link" data-test-id="nav-campaigns-link">Campaigns</a>
          
          @if (authService.isAuthenticated()) {
            @switch (authService.currentUser()?.role) {
              @case ('student') {
                <a routerLink="/student/dashboard" class="nav-link" data-test-id="nav-dashboard-link">My Dashboard</a>
              }
              @case ('admin') {
                <a routerLink="/admin/dashboard" class="nav-link" data-test-id="nav-dashboard-link">Admin Dashboard</a>
              }
              @case ('sponsor') {
                <a routerLink="/sponsor/dashboard" class="nav-link" data-test-id="nav-dashboard-link">Sponsor Dashboard</a>
              }
            }
            <button class="btn btn-outline btn-sm" (click)="logout()" data-test-id="logout-button">
              Logout
            </button>
          } @else {
            <a routerLink="/login" class="btn btn-outline btn-sm" data-test-id="login-button">Login</a>
            <a routerLink="/register" class="btn btn-primary btn-sm" data-test-id="register-button">Get Started</a>
          }
        </div>
      </div>
    </nav>
  `,
    styles: [`
    .navbar {
      height: 64px;
      background-color: var(--color-snow);
      border-bottom: 1px solid var(--color-hare);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .navbar-container {
      max-width: var(--max-width-xl);
      height: 100%;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .navbar-brand {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-extrabold);
      color: var(--color-primary);
      text-decoration: none;
    }
    
    .logo-icon {
      font-size: 28px;
    }
    
    .navbar-links {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }
    
    .nav-link {
      padding: var(--spacing-sm) var(--spacing-md);
      color: var(--color-wolf);
      font-weight: var(--font-weight-semibold);
      text-decoration: none;
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      
      &:hover {
        color: var(--color-eel);
        background-color: var(--color-swan);
      }
    }
    
    @media (max-width: 768px) {
      .logo-text {
        display: none;
      }
      
      .navbar-links {
        gap: var(--spacing-sm);
      }
      
      .nav-link {
        padding: var(--spacing-xs) var(--spacing-sm);
        font-size: var(--font-size-sm);
      }
    }
  `],
})
export class NavbarComponent {
    constructor(public authService: AuthService) { }

    logout(): void {
        this.authService.logout();
    }
}
