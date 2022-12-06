import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { Md5hashService } from 'src/app/services/md5hash.service';
import { UserService } from 'src/app/services/user.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css'],
})
export class UserAccountsComponent implements OnInit {
  visible = false;
  submit = true;
  drawerTitle: string = '';
  createUserForm!: FormGroup;
  user_data: any;
  users: any = [];
  departments: any[] = [];
  d_name: any = {};
  searchText = '';

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notificationService: NotificationService,
    private md5: Md5hashService,
    private user: UserService,
    private deptService: DepartmentService
  ) {}
  formArray = [
    {
      label: 'Invoice Id',
      control: 'invoice_id',
      holder: 'Invoice Id',
      type: 'number',
    },
  ];

  ngOnInit(): void {
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);

    this.deptService.getDepartments().subscribe((res) => {
      this.departments = res;
    });

    this.user.getAllUsers().subscribe((res) => {
      this.users = res;
    });
    this.userAccountsFormValidators();
  }

  create(): void {
    this.submit = true;
    this.visible = true;
    this.drawerTitle = 'Create User';
    this.userAccountsFormValidators();
  }

  onSubmit() {
    let checkData = {
      email: this.createUserForm.value.email,
      user_name: this.createUserForm.value.user_name,
    };

    this.api.postCall('user/checkUser', checkData).subscribe((res) => {
      if (res.message === 'exist') {
        return this.notificationService.createNotification('fail', res.message);
      }
    });

    if (this.createUserForm.valid) {
      this.createUserForm.value.password_md5 = this.md5.logMd5(
        this.createUserForm.value.password_md5
      );
      this.api
        .postCall('/user/createUser', this.createUserForm.value)
        .subscribe((data) => {
          this.notificationService.createNotification('success', data.message);
        });
      this.visible = false;
    } else {
      Object.values(this.createUserForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  edit(data: any) {
    this.submit = false;
    this.visible = true;
    this.drawerTitle = 'Edit User Details';
    console.log(data);
    this.userAccountsFormValidators();
    this.createUserForm.get('first_name')?.setValue(data.first_name);
    this.createUserForm.get('last_name')?.setValue(data.last_name);
    this.createUserForm.get('email')?.setValue(data.email);
    this.createUserForm.get('user_name')?.setValue(data.user_name);
    this.createUserForm.get('password_md5')?.setValue(null);
    this.createUserForm.get('cnfrm_password_md5')?.setValue(null);
    this.createUserForm.get('phone_number')?.setValue(data.phone_number);
    this.createUserForm
      .get('department_id')
      ?.setValue(data.department_id.toString());
    this.createUserForm.get('address')?.setValue(data.address);
    this.createUserForm.get('city')?.setValue(data.city);
    this.createUserForm.get('district')?.setValue(data.district);
    this.createUserForm.get('created_by')?.setValue(this.user_data.user_id);
    this.createUserForm.get('updated_by')?.setValue(this.user_data.user_id);
    this.createUserForm.get('user_id')?.setValue(data.user_id);
  }

  onUpdate() {
    if (this.createUserForm.valid){
      this.api
      .patchCall(
        `/user/updateUser/${this.createUserForm.value.user_id}`,
        this.createUserForm.value
      )
      .subscribe();
    this.visible = false;
    this.api.getCall('/user/getUsers').subscribe((res) => {
      this.users = [];
      this.users = res;
    });
    }
    else {
      
      Object.values(this.createUserForm.controls).forEach(control => {
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

  userAccountsFormValidators() {
    this.createUserForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      user_name: [null, [Validators.required]],
      password_md5: [null, [Validators.required]],
      cnfrm_password_md5: [null, [Validators.required]],
      phone_number: [null, [Validators.required]],
      department_id: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      district: [null, [Validators.required]],
      created_by: [this.user_data.user_id],
      updated_by: [this.user_data.user_id],
    });
  }
}
