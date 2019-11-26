import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  searchForm: FormGroup;

  constructor(fb: FormBuilder, private route: Router, public authService: AuthService) {
    this.searchForm = fb.group({
      'search': ['']
    });
   }

  ngOnInit() {
  }

  onSubmit(value: any): void {
    this.route.navigate(['search', {terms: value.search}]);
  }

  logout() {
    this.authService.logout();
  }
}
