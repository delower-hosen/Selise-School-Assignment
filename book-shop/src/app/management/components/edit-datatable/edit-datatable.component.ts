import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { defaultConstant } from 'src/app/config/constants/default.constant';
import { ManagementService } from 'src/app/shared-services/management.service';
import { CommonDataService } from 'src/app/shared-services/common-data.service';
import { log } from 'util';

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
    this._commonDataService.updateBook(newBook).subscribe(res=>{
      console.log(res);
      this._managementService.emitTableUpdateEvent(newBook);
      this.dialogRef.close();
      this.resetForm();
    });
    
  }

  intitForm(){
    this.formAddBook = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      author: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      imageurl: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      bookid: new FormControl('', Validators.required),
      _id: new FormControl('', Validators.required),
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
