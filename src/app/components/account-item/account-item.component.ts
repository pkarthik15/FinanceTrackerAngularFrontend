import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountRead  } from '../../models/accountRead';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.css']
})
export class AccountItemComponent implements OnInit {

  @Input() account: AccountRead;
  @Output() onDeleteTask: EventEmitter<AccountRead> = new EventEmitter();
  faTrash = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(account:AccountRead) {
    this.onDeleteTask.emit(account);
  }

}
