import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(private router: Router) {
    this.currentUrl = this.router.url; 

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  getPreviousUrl(): string | null {
    if(this.previousUrl){
      this.previousUrl = this.previousUrl.replace(/^\/(.*)$/, "$1");
    }
    return this.previousUrl;
  }

  getCurrentUrl(): string | null {
    if(this.currentUrl){
      this.currentUrl = this.currentUrl.replace(/^\/(.*)$/, "$1");
    }
    return this.currentUrl;
  }
}
