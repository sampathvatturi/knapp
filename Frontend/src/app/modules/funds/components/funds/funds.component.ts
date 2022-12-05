import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  listOfData: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  departmentform!: FormGroup;
  searchText = '';
  
  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.departmentform = this.fb.group({
      department_id: [''],
      department_name: [''],
      ranking: [''],
      status: [''],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: [''],
      department_code: [''],
    });
    this.api.getCall('/dept/getDepts').subscribe((list) => {
      this.listOfData = list;
      console.log(this.listOfData);
    });
  }
  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit';
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
    this.submit = true;
    this.drawerTitle = 'New';
    this.visible = true;
    this.departmentform = this.fb.group({
      department_id: [''],
      department_name: ['', [Validators.required]],
      ranking: ['', [Validators.required]],
      status: ['', [Validators.required]],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: [''],
      department_code: [''],
    });
  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {
    console.log(this.departmentform);
    this.api.postCall('/dept', this.departmentform.value).subscribe();
    this.visible = false;
    this.api.getCall('/dept').subscribe((list) => {
      this.listOfData = list;
    });
  }
  update() {
    this.api.patchCall('/dept', this.departmentform.value).subscribe();
    this.visible = false;
    this.api.getCall('/dept').subscribe((list) => {
      this.listOfData = list;
    });
  }

}
