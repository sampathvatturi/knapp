import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-accounting-details',
  templateUrl: './accounting-details.component.html',
  styleUrls: ['./accounting-details.component.css'],
})
export class AccountingDetailsComponent implements OnInit {
  searchText = '';
  accountDetails: any = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // this.api.getCall('//').subscribe((res) =>{
    //   this.accountDetails = res;
    // })
  }
}
