import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CRUDServiceService {

  constructor(public fireStore: AngularFirestore) { }

  /**
   * 
   * @param record User Data to add record
   */
  create_NewUser(record: any) {
    return this.fireStore.collection('users').add(record);
  }

  /**
   * Show User data
   */
  read_Users() {
    return this.fireStore.collection('users').snapshotChanges();
  }

  /**
   * 
   * @param recordID User Id
   * @param record User Data
   * Update Record
   */
  update_Users(recordID: any, record: any) {
    return this.fireStore.doc('users/' + recordID).update(record);
  }

  /**
   * @param record_id User Id
   * Delete Record
  */
  delete_Users(record_id: any) {
    return this.fireStore.doc('users/' + record_id).delete();
  }
}
