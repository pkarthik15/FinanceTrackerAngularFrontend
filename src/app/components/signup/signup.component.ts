import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor( private fb:FormBuilder, private authService:AuthService, private router:Router, private storate:TokenStorageService ) 
  { 
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.authService.register(this.form.value).subscribe({
      next: data => {
        this.form.reset();
        this.storate.saveUser(data);
        this.router.navigate(['home'])
      },
      error: err => {
        this.errorMessage = err.error.error;
        this.isSignUpFailed = true;
      }
    })
  }

}
