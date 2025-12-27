import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card card-elevated">
        <div class="auth-header">
          <span class="auth-icon">🌱</span>
          <h1>Welcome Back!</h1>
          <p class="text-muted">Log in to continue your habit journey</p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
          
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              class="form-input" 
              formControlName="email"
              placeholder="your@email.com"
              data-test-id="login-email-input"
              [class.error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
            >
            @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
              <span class="form-error">Please enter a valid email</span>
            }
          </div>
          
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              class="form-input" 
              formControlName="password"
              placeholder="Enter your password"
              data-test-id="login-password-input"
              [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
            >
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
              <span class="form-error">Password is required</span>
            }
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary btn-lg auth-submit"
            [disabled]="loginForm.invalid || loading"
            data-test-id="login-submit-button"
          >
            @if (loading) {
              <span class="spinner spinner-sm"></span>
              Logging in...
            } @else {
              Log In
            }
          </button>
        </form>
        
        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/register" data-test-id="register-link">Sign up</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-lg);
    }
    
    .auth-card {
      width: 100%;
      max-width: 420px;
      padding: var(--spacing-xl);
    }
    
    .auth-header {
      text-align: center;
      margin-bottom: var(--spacing-xl);
    }
    
    .auth-icon {
      font-size: 48px;
      display: block;
      margin-bottom: var(--spacing-md);
    }
    
    .auth-header h1 {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--spacing-xs);
    }
    
    .auth-form {
      margin-bottom: var(--spacing-lg);
    }
    
    .auth-submit {
      width: 100%;
      margin-top: var(--spacing-md);
    }
    
    .auth-footer {
      text-align: center;
      color: var(--color-wolf);
    }
    
    .error-alert {
      background: #FEE2E2;
      border: 1px solid var(--color-danger);
      color: var(--color-danger);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-md);
      text-align: center;
    }
  `],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        if (response.success) {
          const role = response.data.user.role;
          this.router.navigate([`/${role}/dashboard`]);
        }
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
