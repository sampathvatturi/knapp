import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { TransactionDetailsService } from 'src/app/services/transaction-details.service';

@Component({
  selector: 'app-accounting-details',
  templateUrl: './accounting-details.component.html',
  styleUrls: ['./accounting-details.component.css'],
})
export class AccountingDetailsComponent implements OnInit {
  searchText = '';
  accountDetails: any = [];
  user_data: any;
  acctDetails: any []=[];

  constructor(
    private notification: NotificationService,
    private transactionDetailsService: TransactionDetailsService
  ) {}

  ngOnInit(): void {
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getAcctDetails();
  }

  getAcctDetails(): void {    
    this.transactionDetailsService.getAcctDetails().subscribe( res =>{
      this.acctDetails = res;
    })
  }
}
