import { Component, OnInit } from '@angular/core';
import { FormGroup, PatternValidator, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { DepartmentService } from 'src/app/services/department.service';
import { GlobalConstants } from 'src/app/shared/global_constants';

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
  departments = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  departmentForm!: FormGroup;
  user_data: any;
  searchText = '';

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
    private notification: NotificationService,
    private deptService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.departmentFormValidators();
    this.deptService
      .getDepartments()
      .subscribe((res) => (this.departments = res));
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Department';
    this.visible = true;
    this.departmentFormValidators();
    this.departmentForm.get('status')?.setValue('active');
    this.departmentForm.get('created_by')?.setValue(this.user_data.user_id);
    this.departmentForm.get('updated_by')?.setValue(this.user_data.user_id);
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      this.api
        .postCall('/dept/createDept/', this.departmentForm.value)
        .subscribe((res) => {
          this.notification.createNotification('success', res.message);
          if (res.status === 'success') {
            this.visible = false;
            this.deptService
              .getDepartments()
              .subscribe((res) => (this.departments = res));
          }
        });
    } else {
      Object.values(this.departmentForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Department Details';
    this.visible = true;
    this.departmentFormValidators();
    this.departmentForm.get('department_id')?.setValue(data.department_id);
    this.departmentForm.get('department_name')?.setValue(data.department_name);
    this.departmentForm.get('ranking')?.setValue(data.ranking);
    this.departmentForm.get('status')?.setValue(data.status);
    this.departmentForm.get('created_by')?.setValue(data.created_by);
    this.departmentForm.get('updated_by')?.setValue(this.user_data.user_id);
  }

  onUpdate() {
    if (this.departmentForm.valid) {
      this.api
        .patchCall(
          `/dept/updateDept/${this.departmentForm.value.department_id}`,
          this.departmentForm.value
        )
        .subscribe((res) => {
          this.notification.createNotification(res.status, res.message);
          this.deptService
            .getDepartments()
            .subscribe((res) => (this.departments = res));
        });
      this.visible = false;
    } else {
      Object.values(this.departmentForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  close(): void {
    this.visible = false;
  }

  departmentFormValidators() {
    this.departmentForm = this.fb.group({
      department_id: [''],
      department_name: ['', [ Validators.required,
                              Validators.maxLength(50),
                              Validators.minLength(10),
                              Validators.pattern(GlobalConstants.nameRegex)
                            ]
                       ],
      ranking: ['', [Validators.required]],
      status: ['', [Validators.required]],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: [''],
      department_code: [''],
    });
  }
}
