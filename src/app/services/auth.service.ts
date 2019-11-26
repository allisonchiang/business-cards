import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    loginStatus: boolean;

    constructor(private fireAuth: AngularFireAuth, private router: Router) {
      this.loginStatus = false;


        // this.fireAuth.authState.subscribe(user => {
        //   if (user) {
        //     this.loginStatus = true;
        //     console.log('user is logged in');
            
        //   } else {
        //     this.loginStatus = false;
        //     console.log('user not logged in');
        //   }
        // });
    }

    login(email: string, password: string) {
        this.fireAuth.auth.signInWithEmailAndPassword(email, password)
          .then(
            (auth) => {
              console.log('user successfully logged in');
              this.loginStatus = true;
              this.router.navigate(['dashboard']);
            } 
          )
          .catch(
            (error) => {
              console.log('email or password not correct');
            //   this.message = 'Incorrect credentials.';
            //   setTimeout(function() {
            //     this.message = '';
            //   }.bind(this), 2500);
            });
      }
    
      logout() {
        this.fireAuth.auth.signOut()
          .then(
            (auth) => {
              this.loginStatus = false;
              console.log('user successfully logged out');
              this.router.navigate(['login']);
            } 
          )
          .catch(
            (error) => {
              console.log('Error. Could not sign out.');
            });
      }

    isLoggedIn(): boolean {
        return this.loginStatus;
    }
}