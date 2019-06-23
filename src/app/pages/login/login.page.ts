import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public loginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthenticationService,
    public alertCtrl: AlertController,
    public loader: LoadingController,
    public navCtrl: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * 
   * @param val Login Form Data 
   */
  submitForm(val: any) {
    this.loader.create({
      message: 'Please wait...',
    }).then((showLoader: any) => {
      showLoader.present();
    });
    this.authService.loginUser(val.value).then((success: any) => {
      this.loader.dismiss();
      this.navCtrl.navigateRoot('/home');
      localStorage.setItem('isLogin', 'true');
    }).catch((error: any) => {
      this.loader.dismiss();
      if (error.code === 'auth/user-not-found') {
        this.alertCtrl.create({
          header: 'Login',
          message: 'This email address is not register',
          buttons: ['OK']
        }).then((alert: any) => {
          alert.present();
        });
      } else if (error.code === 'auth/wrong-password') {
        this.alertCtrl.create({
          header: 'Login',
          message: 'The password is invalid',
          buttons: ['OK']
        }).then((alert: any) => {
          alert.present();
        });
      }
    });
  }
}
