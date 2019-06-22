import { AddUserPage } from './../add-user/add-user.page';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoadingController, NavController, ModalController } from '@ionic/angular';

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
    public navCtr: NavController,
    public modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
  }

  openadduserModal() {
    this.modalCtrl.create({
      component: AddUserPage
    }).then((modal: any) => {
      modal.present();
    });
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
