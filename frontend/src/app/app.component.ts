import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToastComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <app-toast></app-toast>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 64px);
      padding: 24px;
      background-color: var(--color-swan);
    }
  `],
})
export class AppComponent {
  title = 'Habits for Good';
}
