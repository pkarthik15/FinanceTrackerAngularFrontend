import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Finance Tracker';
  
  constructor(public storage:TokenStorageService, private router:Router) {
     
  }

   

  logout() {
      this.storage.clean()
      this.router.navigate(['login'])
  }

}
