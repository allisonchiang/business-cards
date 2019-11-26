import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginForm: FormGroup;

  constructor(fb: FormBuilder, public authService: AuthService, private router: Router) {
    this.loginForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  onSubmit(value: any): void {

    if (this.loginForm.valid) {
      this.authService.login(value.email, value.password);
    }
    
  }

  logout() {
    this.authService.logout();
  }

}