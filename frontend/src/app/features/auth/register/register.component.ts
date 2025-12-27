import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

type UserType = 'student' | 'admin' | 'sponsor';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card card-elevated">
        <div class="auth-header">
          <span class="auth-icon">🎉</span>
          <h1>Join the Fun!</h1>
          <p class="text-muted">Create your account and start making a difference</p>
        </div>
        
        <!-- User Type Selection -->
        <div class="user-type-selector" data-test-id="user-type-selector">
          <button 
            type="button"
            class="type-btn" 
            [class.active]="selectedType === 'student'"
            (click)="selectType('student')"
            data-test-id="type-student-button"
          >
            <span class="type-icon">👧</span>
            <span>Kid/Student</span>
          </button>
          <button 
            type="button"
            class="type-btn" 
            [class.active]="selectedType === 'admin'"
            (click)="selectType('admin')"
            data-test-id="type-admin-button"
          >
            <span class="type-icon">👩‍🏫</span>
            <span>Teacher/Guide</span>
          </button>
          <button 
            type="button"
            class="type-btn" 
            [class.active]="selectedType === 'sponsor'"
            (click)="selectType('sponsor')"
            data-test-id="type-sponsor-button"
          >
            <span class="type-icon">💝</span>
            <span>Sponsor</span>
          </button>
        </div>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
          
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              class="form-input" 
              formControlName="email"
              placeholder="your@email.com"
              data-test-id="register-email-input"
            >
          </div>
          
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              class="form-input" 
              formControlName="password"
              placeholder="Create a password"
              data-test-id="register-password-input"
            >
            <span class="form-hint">At least 8 characters</span>
          </div>
          
          @if (selectedType === 'student') {
            <div class="form-group">
              <label class="form-label" for="displayName">Your Name</label>
              <input 
                type="text" 
                id="displayName" 
                class="form-input" 
                formControlName="displayName"
                placeholder="What should we call you?"
                data-test-id="register-displayname-input"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label" for="age">Your Age</label>
              <select id="age" class="form-input" formControlName="age" data-test-id="register-age-input">
                <option value="">Select your age</option>
                <option value="5">5 years old</option>
                <option value="6">6 years old</option>
                <option value="7">7 years old</option>
                <option value="8">8 years old</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="parentEmail">Parent's Email</label>
              <input 
                type="email" 
                id="parentEmail" 
                class="form-input" 
                formControlName="parentEmail"
                placeholder="parent@email.com"
                data-test-id="register-parentemail-input"
              >
              <span class="form-hint">We'll send updates to your parent</span>
            </div>
          }
          
          @if (selectedType === 'admin' || selectedType === 'sponsor') {
            <div class="form-group">
              <label class="form-label" for="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                class="form-input" 
                formControlName="name"
                placeholder="Your full name"
                data-test-id="register-name-input"
              >
            </div>
          }
          
          @if (selectedType === 'admin') {
            <div class="form-group">
              <label class="form-label" for="organization">Organization/School</label>
              <input 
                type="text" 
                id="organization" 
                class="form-input" 
                formControlName="organization"
                placeholder="Where do you teach/guide?"
                data-test-id="register-organization-input"
              >
            </div>
          }
          
          <button 
            type="submit" 
            class="btn btn-primary btn-lg auth-submit"
            [disabled]="loading"
            data-test-id="register-submit-button"
          >
            @if (loading) {
              <span class="spinner spinner-sm"></span>
              Creating account...
            } @else {
              Create Account
            }
          </button>
        </form>
        
        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/login" data-test-id="login-link">Log in</a></p>
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
      max-width: 480px;
      padding: var(--spacing-xl);
    }
    
    .auth-header {
      text-align: center;
      margin-bottom: var(--spacing-lg);
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
    
    .user-type-selector {
      display: flex;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-lg);
    }
    
    .type-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-md);
      background: var(--color-swan);
      border: 2px solid transparent;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);
      font-family: var(--font-family);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-wolf);
      
      &:hover {
        background: var(--color-snow);
        border-color: var(--color-hare);
      }
      
      &.active {
        background: var(--color-mint);
        border-color: var(--color-primary);
        color: var(--color-eel);
      }
    }
    
    .type-icon {
      font-size: 28px;
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
    
    @media (max-width: 480px) {
      .type-btn {
        padding: var(--spacing-sm);
        font-size: var(--font-size-xs);
      }
      
      .type-icon {
        font-size: 24px;
      }
    }
  `],
})
export class RegisterComponent {
  selectedType: UserType = 'student';
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.createForm();
  }

  selectType(type: UserType): void {
    this.selectedType = type;
    this.registerForm = this.createForm();
  }

  createForm(): FormGroup {
    const base = {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    };

    switch (this.selectedType) {
      case 'student':
        return this.fb.group({
          ...base,
          displayName: ['', [Validators.required]],
          age: ['', [Validators.required]],
          parentEmail: ['', [Validators.required, Validators.email]],
        });
      case 'admin':
        return this.fb.group({
          ...base,
          name: ['', [Validators.required]],
          organization: [''],
        });
      case 'sponsor':
        return this.fb.group({
          ...base,
          name: ['', [Validators.required]],
        });
      default:
        return this.fb.group(base);
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const formData = this.registerForm.value;

    let request$;
    switch (this.selectedType) {
      case 'student':
        request$ = this.authService.registerStudent({
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName,
          age: parseInt(formData.age),
          parentEmail: formData.parentEmail,
        });
        break;
      case 'admin':
        request$ = this.authService.registerAdmin({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          organization: formData.organization,
        });
        break;
      case 'sponsor':
        request$ = this.authService.registerSponsor({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });
        break;
    }

    request$?.subscribe({
      next: () => {
        this.router.navigate([`/${this.selectedType}/dashboard`]);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
