import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(public router: Router, public navCtrl: NavController) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (localStorage.getItem('isLogin') === 'true') {
      // this.navCtrl.navigateRoot('/home');
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
