import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage{

  public maxDate: any;
  constructor(public modalCtrl: ModalController) {
    this.maxDate = moment().format('MM/DD/YYYY');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
