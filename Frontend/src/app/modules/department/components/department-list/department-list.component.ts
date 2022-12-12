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
  departmentId: any;

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
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.departmentFormValidators();
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getDepartment();
  }

  getDepartment() {
    this.departmentService.getDepartments().subscribe((res) => {
      this.departments = res;
    })
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Department Details';
    this.visible = true;
    this.departmentFormValidators();
    this.departmentForm.get('status')?.setValue('active');
  }

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Department Details';
    this.visible = true;
    this.departmentId = data?.department_id
    this.departmentFormValidators();
    this.departmentForm.get('department_id')?.setValue(data.department_id);
    this.departmentForm.get('department_name')?.setValue(data.department_name);
    this.departmentForm.get('ranking')?.setValue(data.ranking);
    this.departmentForm.get('status')?.setValue(data.status);
    this.departmentForm.get('created_by')?.setValue(data.created_by);
    this.departmentForm.get('updated_by')?.setValue(this.user_data.user_id);
  }

  close(): void {
    this.visible = false;
  }

  prepareDepartmentPayload(data: any) {
    const payload = {
      department_name: data.department_name,
      ranking: data.ranking,
      status: data.status,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.departmentForm.valid) {
      this.departmentService.createDepartment(this.prepareDepartmentPayload(this.departmentForm.value)).subscribe((res) => {
        this.visible = false;
        this.getDepartment();
        this.notification.createNotification("success", res?.message);
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

  prepareUpdatePayload(data: any) {
    const payload = {
      department_name: data.department_name,
      ranking: data.ranking,
      status: data.status,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onUpdateSubmit() {
    if (this.departmentForm.valid) {
      this.departmentService.updateDepartment(this.departmentId, this.prepareUpdatePayload(this.departmentForm.value)).subscribe((res) => {
        this.visible = false;
        this.notification.createNotification("success", res?.message);
        this.getDepartment();
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

  departmentFormValidators() {
    this.departmentForm = this.fb.group({
      department_name: ['', [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(10),
      Validators.pattern(GlobalConstants.nameRegex)
      ]
      ],
      ranking: ['', [Validators.required]],
      status: ['', [Validators.required]],
      department_code: [''],
    });
  }
}
