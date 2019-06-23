import { AddUserPage } from './../add-user/add-user.page';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoadingController, NavController, ModalController, ActionSheetController, Events } from '@ionic/angular';
import { CRUDServiceService } from '../../services/crud/crudservice.service';
import { NavigationExtras, Router } from '@angular/router';

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
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public crudService: CRUDServiceService,
    public actionSheetController: ActionSheetController,
    public event: Events,
    public router: Router
  ) {
    this.event.subscribe('showUserData', () => {
      this.showUserData();
    });
  }

  ionViewWillEnter() {
    this.showUserData();
  }

  /**
   * Show User Data
   */
  showUserData() {
    this.crudService.read_Users().subscribe(data => {
      this.userDetails = data.map(e => {
        return {
          id: e.payload.doc.id,
          fname: e.payload.doc.data()['fname'],
          lname: e.payload.doc.data()['lname'],
          email: e.payload.doc.data()['email'],
          gender: e.payload.doc.data()['gender'],
          dob: e.payload.doc.data()['dob'],
        };
      });
    });
  }

  /**
   * 
   * @param val User Data
   */
  openadduserModal(val: any) {
    this.modalCtrl.create({
      component: AddUserPage,
      componentProps: { param: val }
    }).then((modal: any) => {
      modal.present();
    });
  }

  /**
   * Show Options Edit/Delete/view 
   */
  showOptions(val: any) {
    this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteRecord(val);
        }
      }, {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          this.openadduserModal(val);
        }
      }, {
        text: 'view',
        icon: 'eye',
        handler: () => {
          let navigationExtras: NavigationExtras = {
            state: {
              user: val
            }
          };
          this.router.navigate(['view-user'], navigationExtras);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    }).then((actionSheet: any) => {
      actionSheet.present();
    });
  }

  /**
   * 
   * @param val User ID
   */
  deleteRecord(val: any) {
    this.crudService.delete_Users(val.id).then((success: any) => {
    });
  }

  logout() {
    this.authService.logoutUser().then((success: any) => {
      localStorage.setItem('isLogin', 'false');
      this.navCtrl.navigateRoot('/login');
    }).catch(error => {
      console.log('error', error);
    });
  }
}
