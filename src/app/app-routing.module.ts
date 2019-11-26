import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './login/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateComponent } from './update/update.component';
import { CameraComponent } from './camera/camera.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  // {path: 'dashboard', component: DashboardComponent},

  {path: 'login', component: LoginComponent}, 
  {path: 'update/:id', component: UpdateComponent, canActivate: [AuthGuard]},
  {path: 'camera', component: CameraComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];


// const routes: Routes = [
//   {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
//   {path: 'dashboard', component: DashboardComponent},

//   // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
//   // {path: 'dashboard', component: DashboardComponent},

//   {path: 'login', component: LoginComponent}, 
//   {path: 'update/:id', component: UpdateComponent},
//   {path: 'camera', component: CameraComponent},
//   {path: 'search', component: SearchComponent},
//   {path: '**', component: NotFoundComponent}
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }