import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { defaultConstant } from 'src/app/config/constants/default.constant';
import { ManagementService } from 'src/app/services/management.service';
import { CommonDataService } from 'src/app/services/common-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-datatable.component.html',
  styleUrls: ['./edit-datatable.component.scss']
})
export class EditDatatableComponent implements OnInit {
  public formAddBook: FormGroup;
  public tempdata = [];
  public storeKey = defaultConstant.Keys.StoreKey;
  public cartKey = defaultConstant.Keys.CartKey;

  constructor(
    public dialogRef: MatDialogRef<EditDatatableComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _managementService: ManagementService,
    private _commonDataService: CommonDataService
  ) {
    this.tempdata = cloneDeep(this.data)
   }

  ngOnInit() {
    this.intitForm();
  }

  onSubmit(){
    let newBook = this.formAddBook.value;
    this._managementService.emitTableUpdateEvent(newBook);
    this.data = cloneDeep(this.tempdata);
    let store = [];
    store = this._commonDataService.getData(this.storeKey);
    for(let i = 0; i<store.length;i++){
      if(store[i].bookid == this.data.bookid){
        store[i] = cloneDeep(newBook);
      }
    }
    this._commonDataService.setData(this.storeKey, store);
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
}
