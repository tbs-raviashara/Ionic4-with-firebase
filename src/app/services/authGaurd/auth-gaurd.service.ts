import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(public navCtrl: NavController) { }

  canActivate() {
    if (localStorage.getItem('isLogin') === 'true') {
      return true;
    } else {
      this.navCtrl.navigateRoot(['/login']);
      return false;
    }
  }
}
