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



  Person= [
    {
      desc: 'I ve an issue with lungs',
      name: 'John Brown',
      date: '25-04-2022',
      status: 'Active'
    },
    {
      desc: 'I ve an issue with legs',
      name: 'Jim Green',
      date: '25-04-2022',
      status: 'Active'
    },
    {
      desc: 'I ve an issue with hair',
      name: 'Joe Black',
      date: '25-04-2022',
      status: 'Inactive'
    }
  ];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 10, 50, 80, 70, 56, 55, 40 ],
        label: 'Series A',
        fill: false,
        tension: 0,
        borderColor: 'rgba(148,218,181,0.3)',
        backgroundColor: 'rgba(148,218,181,0.3)'
      },
      {
        data: [ 80, 57, 85, 51, 56, 55, 40 ],
        label: 'Series B',
        fill: false,
        tension: 0,
        borderColor: 'rgba(100,169,195,0.3)',
        backgroundColor: 'rgba(100,169,195,0.3)'
      }
    ]
  };

  data = [
    {name:'Surya Sampath',desc:'Racing car sprays burning fuel into crowd.',color:'#87d068'},
    {name:'Sai Kumar',desc:'Japanese princess to wed commoner.',color:'#78cee6'}
  ];

//to get first letters
  getstring(x:string){
    return x
    .split(" ")
    .map(n => n[0])
    .join("");
  }
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


  constructor(private api:ApiService) { }

  ngOnInit(): void {

    // this.api.getCall('//').subscribe((res) => {
    //   this.tenders = res;
    //   this.tender_count = this.tenders.length;
    // })
  }

}
