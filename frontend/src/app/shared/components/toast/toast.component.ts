import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Toast } from '../../../core/services/notification.service';
import { animate, style, transition, trigger, state } from '@angular/animations';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    animations: [
        trigger('toastAnimation', [
            state('void', style({ transform: 'translateY(20px)', opacity: 0 })),
            state('*', style({ transform: 'translateY(0)', opacity: 1 })),
            transition('void => *', animate('300ms cubic-bezier(0.19, 1, 0.22, 1)')),
            transition('* => void', animate('200ms ease-in', style({ transform: 'translateY(10px)', opacity: 0 })))
        ])
    ],
    template: `
    <div class="toast-container">
      @for (toast of toasts; track toast.id) {
        <div 
          class="toast" 
          [ngClass]="toast.type"
          [@toastAnimation]
          (click)="remove(toast.id)"
        >
          <div class="toast-icon">{{ getIcon(toast.type) }}</div>
          <div class="toast-message">{{ toast.message }}</div>
          <button class="toast-close">×</button>
        </div>
      }
    </div>
  `,
    styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
      pointer-events: none;
    }

    .toast {
      pointer-events: auto;
      background: white;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      min-width: 300px;
      cursor: pointer;
      border-left: 4px solid transparent;
      overflow: hidden;
    }

    .toast-message {
      flex: 1;
      font-size: 14px;
      line-height: 1.4;
      color: #333;
    }

    .toast-icon {
      font-size: 18px;
    }

    .toast-close {
      background: none;
      border: none;
      font-size: 20px;
      line-height: 1;
      color: #999;
      cursor: pointer;
      padding: 0;
      margin-top: -2px;
    }

    /* Types */
    .toast.success { border-left-color: #4CAF50; }
    .toast.success .toast-icon { color: #4CAF50; }

    .toast.error { border-left-color: #F44336; }
    .toast.error .toast-icon { color: #F44336; }

    .toast.info { border-left-color: #2196F3; }
    .toast.info .toast-icon { color: #2196F3; }

    .toast.warning { border-left-color: #FF9800; }
    .toast.warning .toast-icon { color: #FF9800; }
  `]
})
export class ToastComponent implements OnInit {
    toasts: Toast[] = [];

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.notificationService.toasts$.subscribe(toasts => {
            this.toasts = toasts;
        });
    }

    remove(id: string) {
        this.notificationService.remove(id);
    }

    getIcon(type: string): string {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'info': return 'ℹ️';
            case 'warning': return '⚠️';
            default: return '';
        }
    }
}
