import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { defultConstant } from 'src/app/config/constants/default.constant';
import { ManagementService } from 'src/app/sevices/management.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public formAddBook: FormGroup;
  public tempdata = [];
  public storeKey = defultConstant.Keys.StoreKey;
  public cartKey = defultConstant.Keys.CartKey;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _managementService: ManagementService
  ) {
    this.tempdata = cloneDeep(this.data)
   }

  ngOnInit() {
    this.intitForm();
  }

  onSubmit(){
    debugger;
    let newBook = this.formAddBook.value;
    this._managementService.emitTableUpdateEvent(newBook);
    this.data = cloneDeep(this.tempdata);
    let store = [];
    store = JSON.parse(localStorage.getItem(this.storeKey));
    for(let i = 0; i<store.length;i++){
      if(store[i].bookid == this.data.bookid){
        store[i] = cloneDeep(newBook);
      }
    }
    localStorage.setItem(this.storeKey, JSON.stringify(store));
    this.dialogRef.close();
    this.resetForm();
  }

  intitForm(){
    this.formAddBook = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      author: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      imageurl: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      bookid: new FormControl('', Validators.required)
    });
  }

  get getFormErrors() {
    return this.formAddBook.controls;
  }

  resetForm(){
    setTimeout(() => {
      this.intitForm();
    });
  }

  // onCancel(){
  //   debugger;
  //   this.data = this.tempdata;
  // }

}
