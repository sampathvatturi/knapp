import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { VendorsService } from 'src/app/services/vendors.service';
import { GlobalConstants } from 'src/app/shared/global_constants';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
})
export class VendorsComponent implements OnInit {
  listOfData: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  vendorForm!: FormGroup;
  vendor_info:any = [];
  vendor_array:any = [];
  user_data:any = [];
  searchText = '';
  constructor(private fb: UntypedFormBuilder,
              private api: ApiService,
              private notification:NotificationService,private vendor:VendorsService) {
                this.vendorFormValidators()
              }

  ngOnInit(): void {

    this.vendorFormValidators();

    this.vendor.getVendors().subscribe((res) => this.vendor_info = res);

    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
  }

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Vendor Details';
    this.visible = true;

    this.vendorFormValidators();
    this.vendorForm.get('vendor_id')?.setValue(data.vendor_id);
    this.vendorForm.get('vendor_name')?.setValue(data.vendor_name);
    this.vendorForm.get('address')?.setValue(data.address);
    this.vendorForm.get('status')?.setValue(data.status);
    this.vendorForm.get('phone_number')?.setValue(data.phone_number);
    this.vendorForm.get('updated_by')?.setValue(this.user_data.user_id);


  }
  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add New Vendor';
    this.visible = true;

    this.vendorFormValidators();

    this.vendorForm.get('created_by')?.setValue(this.user_data.user_id);
    this.vendorForm.get('updated_by')?.setValue(this.user_data.user_id);
  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {
    if (this.vendorForm.valid){
    this.api.postCall('/vendor/createVendor', this.vendorForm.value).subscribe();
    this.visible = false;

    this.vendor.getVendors().subscribe((res) => this.vendor_info = res);
    }

    else {
      console.log('invalid')
      Object.values(this.vendorForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  onUpdate() {
    if (this.vendorForm.valid){
      this.api.patchCall('/vendor/updateVendor/'+this.vendorForm.value.vendor_id,this.vendorForm.value).subscribe((res) =>{

        this.notification.createNotification(res.status,res.message);

        this.vendor.getVendors().subscribe((res) => this.vendor_info = res);

      });
      this.visible = false;
    }

      else {
        console.log('invalid')
        Object.values(this.vendorForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }

  }

  vendorFormValidators(){
    this.vendorForm = this.fb.group({
      vendor_id: [''],
      vendor_name: ['',[Validators.required,Validators.pattern(GlobalConstants.nameRegex),Validators.maxLength(50),Validators.minLength(3)]],
      phone_number:['',[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      address:['',[Validators.required,Validators.pattern(GlobalConstants.addressRegex),Validators.minLength(15),Validators.maxLength(150)]],
      status:['',[Validators.required]],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: [''],
      user_name: ['',[Validators.required]],

      password_md5: ['',[Validators.required]],
      confirm: ['',[this.confirmValidator]],
      email: [null, [Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      city: ['',[Validators.required]],
      state: ['',[Validators.required]],
      gst_num: ['',[Validators.required]],
    });
  }
  validateConfirmPassword(): void {
    setTimeout(() => this.vendorForm.controls['confirm'].updateValueAndValidity());
  }
  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.vendorForm.controls['password_md5'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
