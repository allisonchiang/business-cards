import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

//added
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service'; //added
import { AuthGuard } from './login/auth.guard';  //added
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from './services/database.service';
import { CameraComponent } from './camera/camera.component';
import { WebcamModule } from 'ngx-webcam';
import { TextService } from './services/text.service';
import { UpdateComponent } from './update/update.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    DashboardComponent,
    CameraComponent,
    UpdateComponent,
    BusinessCardComponent,
    NavBarComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    WebcamModule,
    // RouterModule.forRoot(routes), // <-- routes
    // AngularFireModule.initializeApp(environment.config), //added
    AngularFireModule.initializeApp(environment.config, "business-card"), //added
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    DatabaseService,
    TextService,
    AngularFireAuth,
    AuthGuard,
    AngularFirestoreModule,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }