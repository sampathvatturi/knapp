import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  tenders:any = [];
  tender_count = 100;
  funds:any = [];
  funds_count = 200;
  works:any = [];
  works_count = 300;



  

  


  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

}
