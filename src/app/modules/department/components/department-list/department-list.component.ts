import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  listOfData: any[] =[];
  visible = false;
  drawerTitle:string='';
  departmentform!:FormGroup
  constructor(private departmentservice: DepartmentService, private fb:UntypedFormBuilder) { }

  ngOnInit(): void {
    this.departmentform = this.fb.group({
      department_id: [null, [Validators.required]],
      department_name: [null, [Validators.required]],
      ranking: [null, [Validators.required]],
      status: [null, [Validators.required]],
      created_date: [null, [Validators.required]],
      created_by: [null, [Validators.required]],
      updated_date: [null, [Validators.required]],
      updated_by: [null, [Validators.required]],
      department_code: [null, [Validators.required]],
    });
      this.departmentservice.getData()
      .subscribe(list => {
        this.listOfData = list;
      });
  }
  edit(data:any){
    this.drawerTitle = "Edit";
    this.visible = true;
    this.departmentform = this.fb.group({
      department_id: [data.department_id, [Validators.required]],
      department_name: [data.department_name, [Validators.required]],
      ranking: [data.ranking, [Validators.required]],
      status: [data.status, [Validators.required]],
      created_date: [data.created_date, [Validators.required]],
      created_by: [data.created_by, [Validators.required]],
      updated_date: [data.updated_date, [Validators.required]],
      updated_by: [data.updated_by, [Validators.required]],
      department_code: [data.department_code, [Validators.required]],
    });
  }
  open(): void {
    this.drawerTitle = "New";
    this.visible = true;
    this.departmentform = this.fb.group({
      department_id: [null, [Validators.required]],
      department_name: [null, [Validators.required]],
      ranking: [null, [Validators.required]],
      status: [null, [Validators.required]],
      created_date: [null, [Validators.required]],
      created_by: [null, [Validators.required]],
      updated_date: [null, [Validators.required]],
      updated_by: [null, [Validators.required]],
      department_code: [null, [Validators.required]],
    });
  }

  close(): void {
    this.visible = false;
  }

}
