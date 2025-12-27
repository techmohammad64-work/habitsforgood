import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService } from '@core/services/campaign.service';

@Component({
  selector: 'app-campaign-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="create-page">
      <header class="page-header">
        <h1 data-test-id="create-campaign-title">Create Campaign</h1>
        <p class="text-muted">Set up a new habit campaign for your students</p>
      </header>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="campaign-form card-elevated">
        @if (error) {
          <div class="error-alert">{{ error }}</div>
        }

        <section class="form-section">
          <h2>Campaign Details</h2>
          <div class="form-group">
            <label class="form-label" for="title">Title *</label>
            <input id="title" type="text" class="form-input" formControlName="title" placeholder="e.g., Healthy Hydration Challenge" data-test-id="campaign-title-input">
          </div>
          <div class="form-group">
            <label class="form-label" for="description">Description</label>
            <textarea id="description" class="form-input" formControlName="description" rows="3" placeholder="Describe the campaign goals..." data-test-id="campaign-description-input"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="startDate">Start Date *</label>
              <input id="startDate" type="date" class="form-input" formControlName="startDate" data-test-id="campaign-start-input">
            </div>
            <div class="form-group">
              <label class="form-label" for="endDate">End Date *</label>
              <input id="endDate" type="date" class="form-input" formControlName="endDate" data-test-id="campaign-end-input">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="goalAmount">Goal Amount ($)</label>
            <input id="goalAmount" type="number" class="form-input" formControlName="goalAmount" placeholder="1000" data-test-id="campaign-goal-input">
          </div>
        </section>

        <section class="form-section">
          <div class="section-header">
            <h2>Habits</h2>
            <button type="button" class="btn btn-outline btn-sm" (click)="addHabit()" data-test-id="add-habit-button">+ Add Habit</button>
          </div>
          
          <div formArrayName="habits" class="habits-list">
            @for (habit of habitsArray.controls; track i; let i = $index) {
              <div class="habit-row" [formGroupName]="i" [attr.data-test-id]="'habit-row-' + i">
                <input type="text" class="form-input" formControlName="name" placeholder="Habit name" [attr.data-test-id]="'habit-name-' + i">
                <select class="form-input" formControlName="icon">
                  @for (icon of iconOptions; track icon.value) {
                    <option [value]="icon.value">{{ icon.emoji }} {{ icon.label }}</option>
                  }
                </select>
                <button type="button" class="btn btn-icon" (click)="removeHabit(i)">🗑️</button>
              </div>
            }
          </div>
        </section>

        <div class="form-actions">
          <button type="button" class="btn btn-outline" (click)="cancel()">Cancel</button>
          <button type="submit" class="btn btn-primary" [disabled]="form.invalid || submitting" data-test-id="create-campaign-submit">
            @if (submitting) { {{ isEditMode ? 'Updating...' : 'Creating...' }} } @else { {{ isEditMode ? 'Update Campaign' : 'Create Campaign' }} }
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .create-page { max-width: 700px; margin: 0 auto; }
    .page-header { margin-bottom: var(--spacing-lg); }
    .page-header h1 { margin-bottom: 4px; }
    .campaign-form { padding: var(--spacing-xl); }
    .form-section { margin-bottom: var(--spacing-xl); }
    .form-section h2 { font-size: var(--font-size-lg); margin-bottom: var(--spacing-md); }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-md); }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); }
    .habits-list { display: flex; flex-direction: column; gap: var(--spacing-sm); }
    .habit-row { display: flex; gap: var(--spacing-sm); align-items: center; }
    .habit-row input { flex: 2; }
    .habit-row select { flex: 1; }
    .form-actions { display: flex; justify-content: flex-end; gap: var(--spacing-md); padding-top: var(--spacing-lg); border-top: 1px solid var(--color-hare); }
    .error-alert { background: #FEE2E2; border: 1px solid var(--color-danger); color: var(--color-danger); padding: var(--spacing-md); border-radius: var(--radius-md); margin-bottom: var(--spacing-md); }
    @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
  `],
})
export class CampaignCreateComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  error = '';
  isEditMode = false;
  campaignId: string | null = null;

  iconOptions = [
    { value: 'water', emoji: '💧', label: 'Water' },
    { value: 'book', emoji: '📚', label: 'Reading' },
    { value: 'sleep', emoji: '😴', label: 'Sleep' },
    { value: 'exercise', emoji: '🏃', label: 'Exercise' },
    { value: 'brushing', emoji: '🦷', label: 'Brushing' },
    { value: 'fruit', emoji: '🍎', label: 'Healthy Eating' },
    { value: 'star', emoji: '⭐', label: 'General' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: CampaignService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      goalAmount: [null],
      habits: this.fb.array([this.createHabit()]),
    });
  }

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id');
    if (this.campaignId) {
      this.isEditMode = true;
      this.loadCampaign(this.campaignId);
    }
  }

  loadCampaign(id: string): void {
    this.campaignService.getCampaignById(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const c = res.data;
          // Format dates to YYYY-MM-DD for input[type=date]
          const startDate = c.startDate ? new Date(c.startDate).toISOString().split('T')[0] : '';
          const endDate = c.endDate ? new Date(c.endDate).toISOString().split('T')[0] : '';

          this.form.patchValue({
            title: c.title,
            description: c.description,
            startDate,
            endDate,
            goalAmount: c.goalAmount
          });

          // Rebuild habits array
          const habitsControl = this.form.get('habits') as FormArray;
          habitsControl.clear();
          if (c.habits && c.habits.length > 0) {
            c.habits.forEach(h => {
              habitsControl.push(this.fb.group({
                id: [h.id], // Keep ID for updates
                name: [h.name, Validators.required],
                icon: [h.icon],
                description: [h.description || '']
              }));
            });
          } else {
            habitsControl.push(this.createHabit());
          }
        }
      },
      error: (_err) => {
        this.error = 'Failed to load campaign';
      }
    });
  }

  get habitsArray(): FormArray { return this.form.get('habits') as FormArray; }

  createHabit(): FormGroup {
    return this.fb.group({ name: ['', Validators.required], icon: ['star'], description: [''] });
  }

  addHabit(): void { this.habitsArray.push(this.createHabit()); }
  removeHabit(i: number): void { if (this.habitsArray.length > 1) this.habitsArray.removeAt(i); }
  cancel(): void { this.router.navigate(['/admin/dashboard']); }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.error = '';

    const payload = this.form.value;

    let request$;
    if (this.isEditMode && this.campaignId) {
      request$ = this.campaignService.updateCampaign(this.campaignId, payload);
    } else {
      request$ = this.campaignService.createCampaign(payload);
    }

    request$.subscribe({
      next: (res) => { if (res.success) this.router.navigate(['/admin/dashboard']); else this.submitting = false; },
      error: (err) => { this.error = err.error?.error?.message || (this.isEditMode ? 'Failed to update campaign' : 'Failed to create campaign'); this.submitting = false; },
    });
  }
}
