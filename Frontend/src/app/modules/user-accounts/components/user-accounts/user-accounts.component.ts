import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { Md5hashService } from 'src/app/services/md5hash.service';
import { UserService } from 'src/app/services/user.service';
import { DepartmentService } from 'src/app/services/department.service';
import { GlobalConstants } from 'src/app/shared/global_constants';
import { A } from 'chart.js/dist/chunks/helpers.core';

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
  updateUserData: any;
  updateUserId: any;
  userRole: any;

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notificationService: NotificationService,
    private md5: Md5hashService,
    private userService: UserService,
    private deptService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getDepts();
    this.getUsers();
    this.userFormFieldsConfig();

  }

  getDepts(): void {
    this.deptService.getDepartments().subscribe((res) => {
      this.departments = res;
    });
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.users = res;
    });
  }

  getUserById(id: any): void {
    this.userService.getUserById(id).subscribe((res: any) => {
      this.updateUserData = res;
      const decrypt_password = this.md5.passwordDecrypt(this.updateUserData[0]?.password_md5);
      this.createUserForm.get('password_md5')?.setValue(decrypt_password);
      this.createUserForm.get('cnfrm_password_md5')?.setValue(decrypt_password);     
      this.createUserForm.get('password_md5')?.disable();
      this.createUserForm.get('cnfrm_password_md5')?.disable();
    });
  }

  create(): void {
    this.submit = true;
    this.visible = true;
    this.drawerTitle = 'Create User';
    this.userFormFieldsConfig();
  }

  onCreateSubmit() {
    const email =  this.createUserForm.value.email;
    const user_name = this.createUserForm.value.user_name;
    const userData = this.users.find((item: any) => (item?.email === email || item?.user_name === user_name));
    console.log("==userData==", userData);
    if (this.createUserForm.valid) {
      if(!userData) {
        this.createUserForm.value.password_md5 = this.md5.passwordEncrypt(this.createUserForm.value.password_md5);
        this.userService.createUser(this.prepareUserPayload(this.createUserForm.value)).subscribe((data) => {          
          this.visible = false;
          this.notificationService.createNotification('success', data.message);
          this.getUsers();
        });
      } else {
        this.notificationService.createNotification('error', "UserName or Email already exists");
      }      
    } else {
      Object.values(this.createUserForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUserPayload(data: any) {
    const userPayload = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      user_name: data.user_name,
      password_md5: data.password_md5,
      phone_number: data.phone_number,
      department_id: data.department_id,
      address: data.address,
      city: data.city,
      district: data.district,
      role: data.role,
      status: data.status,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return userPayload;
  }

  edit(data: any) { 
    this.updateUserId = data?.user_id;
    this.userRole = data?.role;    
    this.userFormFieldsConfig();  
    this.getUserById(this.updateUserId);
    this.submit = false;
    this.visible = true;
    this.drawerTitle = 'Edit User Details';
    this.createUserForm.get('first_name')?.setValue(data?.first_name);
    this.createUserForm.get('last_name')?.setValue(data?.last_name);
    this.createUserForm.get('email')?.setValue(data?.email);
    this.createUserForm.get('user_name')?.setValue(data?.user_name);
    this.createUserForm.get('phone_number')?.setValue(data.phone_number);
    this.createUserForm.get('department_id')?.setValue(data?.department_id?.toString());
    this.createUserForm.get('address')?.setValue(data?.address);
    this.createUserForm.get('city')?.setValue(data?.city);
    this.createUserForm.get('district')?.setValue(data?.district);
    this.createUserForm.get('role')?.setValue(data?.role);
    this.createUserForm.get('status')?.setValue(data?.status); 
    this.createUserForm.get('user_name')?.disable();   
    this.createUserForm.get('email')?.disable();
    if(this.userRole === 'vendor') {      
      this.createUserForm.get('last_name')?.disable();
      this.createUserForm.get('department_id')?.disable();
    }
  }

  prepareUpdateUserPayload(data: any) {
    const userPayload = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      user_name: data.user_name,
      password_md5: data.password_md5,
      phone_number: data.phone_number,
      department_id: data.department_id,
      address: data.address,
      city: data.city,
      district: data.district,
      role: data.role,
      status: data.status,
      updated_by: this.user_data?.user_id
    }
    return userPayload;
  }

  onUpdateSubmit() {
    if (this.createUserForm.valid) {
      this.userService.updateUser(this.updateUserId, this.prepareUpdateUserPayload(this.createUserForm.value)).subscribe((res) => {
        this.notificationService.createNotification(res.status, res.message);
        this.visible = false;
        this.getUsers();
      });
    } else {
      Object.values(this.createUserForm.controls).forEach((control) => {
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

  userFormFieldsConfig() {
    this.createUserForm = this.fb.group({
      first_name: [null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.firstLastNameRegex),
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      last_name: [null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.firstLastNameRegex),
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      user_name: [null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.nameRegex),
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      password_md5: [null, [Validators.required]],
      cnfrm_password_md5: [null, [this.confirmValidator]],
      phone_number: [null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      department_id: [null, [Validators.required]],
      address: [null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.addressRegex),
          Validators.minLength(5),
          Validators.maxLength(150),
        ],
      ],
      city: [null, [Validators.required]],
      district: [null, [Validators.required]],      
      role: ['user', [Validators.required]],         
      status: ['active', [Validators.required]]
    });
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.createUserForm.controls['confirm']?.updateValueAndValidity()
    );
  }

  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.createUserForm.controls['password_md5'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  onChangeRole(event: any): void {
    console.log("==onChangeRole==", event);
    if(event === 'vendor'){
      this.notificationService.createNotification('info', 'You can create vendor details in Vendor menu');
      this.createUserForm.get('role')?.setValue('admin');
    }
  }

}
