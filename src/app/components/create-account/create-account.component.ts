import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountModel } from '../../models/account';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  @Output() onAddAccount: EventEmitter<AccountModel> = new EventEmitter();

  form: FormGroup;
  isFailed:boolean = false;
  errorMessage:string = '';

  constructor(private fb:FormBuilder) 
  { 
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  ngOnInit(): void {

  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    try
    {
      this.onAddAccount.emit(this.form.value);
      this.form.reset();
    }
    catch(e)
    {
        this.isFailed = true;
        this.errorMessage = (e as Error).message;
    }
  }


}
