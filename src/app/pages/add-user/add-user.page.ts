import { Component } from '@angular/core';
import { ModalController, NavParams, Events } from '@ionic/angular';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDServiceService } from '../../services/crud/crudservice.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage {
  public addForm: FormGroup;
  public maxDate = moment().format('YYYY-MM-DD');
  public param: any;
  public title: string;
  constructor(
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public crudService: CRUDServiceService,
    public navParams: NavParams,
    public event: Events
    ) {
    this.addForm = this.formBuilder.group({
      'fname': ['', Validators.required],
      'lname': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'dob': ['', Validators.required],
      'gender': ['', Validators.required],
    });
    this.param = this.navParams.get('param');
    if (this.param) {
      this.title = 'Edit User';
      this.addForm.controls['fname'].setValue(this.param.fname);
      this.addForm.controls['lname'].setValue(this.param.lname);
      this.addForm.controls['email'].setValue(this.param.email);
      this.addForm.controls['dob'].setValue(moment(this.param.dob).format('YYYY-MM-DD'));
      this.addForm.controls['gender'].setValue(this.param.gender);
    } else {
      this.title = 'Add User';
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  /**
   * 
   * @param val User Form Data
   */
  submitForm(val: any) {
    if (this.param) {
      val.value.id = this.param.id;
      this.crudService.update_Users(val.value.id, val.value).then((success: any) => {
       this.closeModal();
        this.event.publish('showUserData');
      }).catch((error: any) => {
        console.log(error);
      });
    } else {
      this.crudService.create_NewUser(val.value).then((success: any) => {
        this.closeModal();
        this.event.publish('showUserData');
      }).catch((error: any) => {
        console.log(error);
      });
    }
  }
}
