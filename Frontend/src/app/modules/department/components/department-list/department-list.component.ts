import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
interface DataItem {
  status: string;
  created_date: string;
  ranking: number;
}
@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  listOfData: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  departmentForm!: FormGroup;
  user_data: any;

  sort = {
    compareStatus: (a: DataItem, b: DataItem) =>
      a.status.localeCompare(b.status),
    compareDate: (a: DataItem, b: DataItem) =>
      a.created_date.localeCompare(b.created_date),
    compareRank: (a: DataItem, b: DataItem) => a.ranking - b.ranking,
  };
  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
      department_id: [{ value: '', disabled: true }],
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
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
  }

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit';
    this.visible = true;
    console.log(data.created_date);
    this.departmentForm = this.fb.group({
      department_id: [
        { value: data.department_id, disabled: true },
        [Validators.required],
      ],
      department_name: [data.department_name, [Validators.required]],
      ranking: [data.ranking, [Validators.required]],
      status: [data.status, [Validators.required]],
      created_date: [data.created_date, [Validators.required]],
      created_by: [data.created_by, [Validators.required]],
      updated_date: [Date.now(), [Validators.required]],
      updated_by: [this.user_data.user_id, [Validators.required]],
      department_code: [data.department_code, [Validators.required]],
    });
  }
  open(): void {
    this.submit = true;
    this.drawerTitle = 'New';
    this.visible = true;
    this.departmentForm = this.fb.group({
      department_id: [{ value: this.user_data.user_id, disabled: true }],
      department_name: ['', [Validators.required]],
      ranking: ['', [Validators.required]],
      status: ['active', [Validators.required]],
      created_date: [''],
      created_by: [this.user_data.user_id],
      updated_date: [''],
      updated_by: [this.user_data.user_id],
      department_code: [''],
    });
  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {
    console.log(this.departmentForm);
    this.api
      .postCall('/dept/createDept/', this.departmentForm.value)
      .subscribe((res) => {
        // console.log(res.message);
        this.notification.createNotification('success', res.message);
        if (res.status === 'success') {
          this.visible = false;
          this.api.getCall('/dept/getDepts').subscribe((list) => {
            this.listOfData = list;
          });
        }
      });
  }
  update() {
    this.api
      .patchCall(
        `/dept/updateDept/${this.user_data.user_id}`,
        this.departmentForm.value
      )
      .subscribe();
    this.visible = false;
    this.api.getCall('/dept/getDepts').subscribe((list) => {
      this.listOfData = list;
    });
  }
}
