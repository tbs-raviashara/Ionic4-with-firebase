import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userDetails: any;
  constructor(
    public authService: AuthenticationService,
    public loader: LoadingController,
    public navCtr: NavController
  ) { }

  ionViewWillEnter() {
    this.loader.create({
      message: 'Please wait',
      duration: 4000
    }).then((showLoader: any) => {
      showLoader.present();
    });
    this.userDetails = this.authService.userDetails();
  }

  logout() {
    this.authService.logoutUser().then((success: any) => {
      localStorage.setItem('isLogin', 'false');
      this.navCtr.navigateRoot('/login');
    }).catch(error => {
      console.log('error', error);
    });

  }
}
