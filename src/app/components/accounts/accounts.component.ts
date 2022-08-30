import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/models/account';
import { AccountRead } from 'src/app/models/accountRead';
import { AccountService  } from '../../services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  acountRecords: AccountRead[] = [];
  errorMessage = '';

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
      this.accountService.getAccounts().subscribe({
        next: (data: AccountRead[] ) => {
          this.acountRecords = data;
        },
        error: err => {
          this.errorMessage = err.error.error;
        }
      });
  }

  deleteAccount(account: AccountRead) {
    this.accountService
      .deleteAccount(account)
      .subscribe(
        () => (this.acountRecords = this.acountRecords.filter((t) => t._id !== account._id))
      );
  }

  addAccount(account: AccountModel) {
    this.accountService.createAccount(account).subscribe((acc) => {
      this.acountRecords = [acc, ...this.acountRecords];
    });
  }



}
