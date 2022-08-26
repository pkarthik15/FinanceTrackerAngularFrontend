import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: TokenStorageService, private router:Router, private fb:FormBuilder) 
  { 
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['home'])
    }
  }

  get f() {
    return this.form.controls;
  }


  onSubmit(): void {
    this.authService.login(this.form.value).subscribe({
      next: data => {
        this.isLoginFailed = false;
        this.storageService.saveUser(data);
        this.router.navigate(['home'])
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error.error;
        this.isLoginFailed = true;
      }
    })
  }

  reloadPage(): void {
    window.location.reload();
  }

}
