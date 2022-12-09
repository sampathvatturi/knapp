import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { DepartmentService } from 'src/app/services/department.service';
import { GlobalConstants } from 'src/app/shared/global_constants';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  transactions = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  departmentForm!: FormGroup;
  user_data: any;
  searchText = '';
  constructor(private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService,
    private deptService: DepartmentService) { }

  ngOnInit(): void {
  }
  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Transaction';
    this.visible = true;
    this.transactionsFormValidators();
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      // this.api
      //   .postCall('/dept/createDept/', this.departmentForm.value)
      //   .subscribe((res) => {
      //     this.notification.createNotification('success', res.message);
      //     if (res.status === 'success') {
      //       this.visible = false;
      //       this.deptService
      //         .getDepartments()
      //         .subscribe((res) => (this.transactions = res));
      //     }
      //   });
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
    this.drawerTitle = 'Edit Transaction Details';
    this.visible = true;
    this.transactionsFormValidators();
    // this.departmentForm.get('department_id')?.setValue(data.department_id);
    // this.departmentForm.get('department_name')?.setValue(data.department_name);
    // this.departmentForm.get('ranking')?.setValue(data.ranking);
    // this.departmentForm.get('status')?.setValue(data.status);
    // this.departmentForm.get('created_by')?.setValue(data.created_by);
    // this.departmentForm.get('updated_by')?.setValue(this.user_data.user_id);
  }

  onUpdate() {
    if (this.departmentForm.valid) {
      // this.api
      //   .patchCall(
      //     `/dept/updateDept/${this.departmentForm.value.department_id}`,
      //     this.departmentForm.value
      //   )
      //   .subscribe((res) => {
      //     this.notification.createNotification(res.status, res.message);
      //     this.deptService
      //       .getDepartments()
      //       .subscribe((res) => (this.transactions = res));
      //   });
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

  transactionsFormValidators() {
    this.departmentForm = this.fb.group({
      trsxcn_from: ['', [Validators.required]],
      trsxcn_to: ['', [Validators.required]],
      category: ['' , [Validators.required] ],
      amount: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      trscxn_date: [''],
      title: ['', [Validators.required]],
      remarks: [''],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: [''],
    });
  }

}
