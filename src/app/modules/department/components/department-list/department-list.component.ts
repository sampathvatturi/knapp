import { Component, OnInit } from '@angular/core';
interface Department {
  department_id: number,
      department_name: string,
      ranking: number,
      status: string,
      created_date:string,
      created_by:number,
      updated_date:string,
      updated_by: number ,
      department_code:string
};
@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  listOfData: Department[] = [
    {
      department_id: 1,
      department_name: 'dept1',
      ranking: 2,
      status: 'active',
      created_date:'2022-11-24 11:46:48',
      created_by:0,
      updated_date:'2022-11-24 11:46:50',
      updated_by: 0 ,
      department_code:''
    },

    {
      department_id: 2,
      department_name: 'dept2',
      ranking: 1,
      status: 'active',
      created_date:'2022-11-24 11:46:48',
      created_by:0,
      updated_date:'2022-11-24 11:46:50',
      updated_by: 0 ,
      department_code:''
    },

  ];
}
