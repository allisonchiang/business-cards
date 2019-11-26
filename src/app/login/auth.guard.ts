import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()

export class AuthGuard implements CanActivate {
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


      this.isLoggedIn = this.authService.isLoggedIn();
      console.log('canActivate', this.isLoggedIn);
      if (this.isLoggedIn) {
        // this.router.navigate(['/dashboard']);
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}