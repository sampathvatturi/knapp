import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { Md5hashService } from 'src/app/services/md5hash.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css'],
})
export class UserAccountsComponent implements OnInit {
  listOfData: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  createUserForm!: FormGroup;
  user_data: any;
  users: any = [];

  departments: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private api: ApiService,
    private notificationService: NotificationService,
    private md5: Md5hashService,
    private user: UserService
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

    this.api.getCall('/dept/getDepts').subscribe((list) => {
      this.departments = list;
    });

    this.user.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });

    this.createUserForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      user_name: [null, [Validators.required]],
      password_md5: [null, [Validators.required]],
      // cnfrm_password_md5: [null, [Validators.required,this.confirmationValidator]],
      phone_number: [null, [Validators.required]],
      department_id: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      district: [null, [Validators.required]],
      created_by: [this.user_data.user_id],
      updated_by: [this.user_data.user_id],
    });
  }

  open(): void {
    this.submit = true;
    this.visible = true;
    this.drawerTitle = 'Create User';
  }

  close(): void {
    this.visible = false;
  }

  onCreate() {
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
          // this.router.navigate(['/login']);
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

    this.drawerTitle = 'Edit User';

    this.createUserForm = this.fb.group({
      first_name: [data.first_name, [Validators.required]],
      last_name: [data.last_name, [Validators.required]],
      email: [data.email, [Validators.required, Validators.email]],
      user_name: [data.user_name, [Validators.required]],
      password_md5: [null, [Validators.required]],
      // cnfrm_password_md5: [null, [Validators.required,this.confirmationValidator]],
      phone_number: [data.phone_number, [Validators.required]],
      department_id: [data.department_id, [Validators.required]],
      address: [data.address, [Validators.required]],
      city: [data.city, [Validators.required]],
      district: [data.district, [Validators.required]],
      created_by: [this.user_data.user_id],
      updated_by: [this.user_data.user_id],
      user_id: [data.user_id],
    });
  }

  updateUser() {
    this.api
      .patchCall(
        `/user/updateUser${this.createUserForm.value.user_id}`,
        this.createUserForm.value
      )
      .subscribe();
    this.visible = false;
    this.api.getCall('/user/getUsers').subscribe((list) => {
      this.listOfData = list;
    });
  }
  @ViewChild('placesRef')
  placesRef!: GooglePlaceDirective;
  // Option = {
  //   componentRestriction: {country: 'IN'}
  // }
  option: Options = new Options({
    bounds: undefined,
    fields: ['address_component'],
    strictBounds: false,
    types: ['geocode', 'route'],
    componentRestrictions: { country: 'IN' },
  });
  public handleAddressChange(address: any) {
    console.log(address);
    this.createUserForm.value.address = address.formatted_address;
    console.log(this.createUserForm.value.address);
  }
}
