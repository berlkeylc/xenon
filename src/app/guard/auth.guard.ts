import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      setTimeout(() => {
        this.authService.user$.pipe(
          take(1),
          map(user => {
            if (user) {
              observer.next(true);  
            } else {
              this.router.navigate(['/welcome-page']); 
              observer.next(false);  
            }
            observer.complete();
          })
        ).subscribe();
      }, 500); 
    });
  }
}