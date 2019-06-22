import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';

/** Services */
import { AuthenticationService } from './services/authentication/authentication.service';
import { CRUDServiceService } from './services/crud/crudservice.service';

import * as firebase from 'firebase';
import { AddUserPageModule } from './pages/add-user/add-user.module';
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AddUserPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    CRUDServiceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
