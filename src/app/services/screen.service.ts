import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth <= 768);
  isMobile$ = this.isMobileSubject.asObservable();

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobileSubject.next(window.innerWidth <= 768);
    });
  }

  get isMobile(): boolean {
    return this.isMobileSubject.value;
  }
}
