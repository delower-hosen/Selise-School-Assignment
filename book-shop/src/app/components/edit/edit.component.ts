import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public formAddBook: FormGroup;
  public tempdata;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    debugger;
    this.intitForm();
    
    this.tempdata = cloneDeep(this.data);
  }

  onSubmit(){
    let newBook = this.formAddBook.value;
    debugger;
    this.data = this.formAddBook.value;
    this.dialogRef.close();
    this.resetForm();
  }

  intitForm(){
    this.formAddBook = new FormGroup({
      bookname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      authorname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      imageurl: new FormControl('', [Validators.required]),
      createddate: new FormControl('', [Validators.required]),
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

  onCancel(){
    debugger;
    this.data = this.tempdata;
  }

}
