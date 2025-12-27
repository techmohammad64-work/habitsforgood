import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private toastsSubject = new BehaviorSubject<Toast[]>([]);
    toasts$ = this.toastsSubject.asObservable();

    constructor() { }

    success(message: string, duration: number = 3000): void {
        this.addToast(message, 'success', duration);
    }

    error(message: string, duration: number = 5000): void {
        this.addToast(message, 'error', duration);
    }

    info(message: string, duration: number = 3000): void {
        this.addToast(message, 'info', duration);
    }

    warning(message: string, duration: number = 4000): void {
        this.addToast(message, 'warning', duration);
    }

    remove(id: string): void {
        const currentToasts = this.toastsSubject.value;
        this.toastsSubject.next(currentToasts.filter(t => t.id !== id));
    }

    private addToast(message: string, type: Toast['type'], duration: number): void {
        const id = Math.random().toString(36).substring(2, 9);
        const toast: Toast = { id, message, type, duration };

        this.toastsSubject.next([...this.toastsSubject.value, toast]);

        if (duration > 0) {
            setTimeout(() => {
                this.remove(id);
            }, duration);
        }
    }
}
