import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { VendorsService } from 'src/app/services/vendors.service';
import { GlobalConstants } from 'src/app/shared/global_constants';
import { Md5hashService } from 'src/app/services/md5hash.service';

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
  mode:any = '';
  vendorId: any;
  updateBtnDisable:boolean = true;

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService,
    private vendorService: VendorsService,
    private md5hashService: Md5hashService
  ) { }

  ngOnInit(): void {
    this.vendorFormValidators();    
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getVendors()
  }

  getVendors(): void {
    this.vendorService.getVendors().subscribe((res) => {
      this.vendor_info = res
    });
  }

  edit(type:any,data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Vendor Details';
    this.visible = true;
    this.mode = false;
    this.vendorId = data?.vendor_id;
    this.vendorFormValidators();
    this.vendorForm.get('vendor_name')?.setValue(data?.vendor_name);
    this.vendorForm.get('address')?.setValue(data?.address);
    this.vendorForm.get('city')?.setValue(data?.city);
    this.vendorForm.get('state')?.setValue(data?.state);
    this.vendorForm.get('district')?.setValue(data?.district);
    this.vendorForm.get('phone_number')?.setValue(data?.phone_number);
    this.vendorForm.get('gst_num')?.setValue(data?.gst_num);
    this.vendorForm.get('status')?.setValue(data?.status);    
    this.vendorForm.get('user_name')?.disable();
    this.vendorForm.get('password_md5')?.disable();
    this.vendorForm.get('email')?.disable();
    this.vendorForm.get('confirm')?.disable();
    this.updateBtnDisable = true;
    if (type === 'view'){
      this.updateBtnDisable = false;
    }
  }
  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Vendor';
    this.visible = true;
    this.mode = true;
    this.vendorFormValidators();
    this.vendorForm.get('status')?.setValue('active');
  }

  close(): void {
    this.visible = false;
  }

  prepareVendorPayload(data: any) {
    const payload = {
      email: data.email,
      user_name: data.user_name,
      password_md5: data.password_md5,
      phone_number: data.phone_number,      
      vendor_name: data.vendor_name,
      address: data.address,
      district: data.district,
      state: data.state,
      city: data.city,
      status: data.status,
      gst_num: data.gst_num,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.vendorForm.valid){
      this.vendorForm.value.password_md5 = this.md5hashService.passwordEncrypt(this.vendorForm.value.password_md5);
      this.vendorService.createVendor(this.prepareVendorPayload(this.vendorForm.value)).subscribe((res) => {
        this.visible = false;
        this.getVendors();
        this.notification.createNotification("success", res?.message);
      });      
    } else {
      console.log('invalid');
      Object.values(this.vendorForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUpdatePayload(data: any) {
    const payload = {     
      vendor_name: data.vendor_name,
      phone_number: data.phone_number, 
      address: data.address,
      district: data.district,
      state: data.state,
      city: data.city,
      status: data.status,
      gst_num: data.gst_num,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onUpdateSubmit() {
    console.log(this.vendorForm);
    if (this.vendorForm.valid) {
      this.vendorService.updateVendor(this.vendorId, this.prepareUpdatePayload(this.vendorForm.value)).subscribe((res) => {
        this.notification.createNotification(res.status,res.message);        
        this.visible = false;
        this.getVendors();
      });
    } else {
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
      vendor_name: ['',[Validators.required,Validators.pattern(GlobalConstants.nameRegex),Validators.maxLength(50),Validators.minLength(3)]],
      phone_number:['',[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex),Validators.minLength(10),Validators.maxLength(10)]],
      address:['',[Validators.required,Validators.pattern(GlobalConstants.addressRegex),Validators.minLength(3),Validators.maxLength(150)]],
      status:['',[Validators.required]],
      user_name: ['',[Validators.required,Validators.pattern(GlobalConstants.nameRegex),Validators.maxLength(50),Validators.minLength(3)]],
      password_md5: ['',[Validators.required ,Validators.minLength(5),Validators.maxLength(5)]],
      confirm: ['',[this.confirmValidator]],
      email: [null, [Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      city: ['',[Validators.required,Validators.pattern(GlobalConstants.firstLastNameRegex),Validators.maxLength(50),Validators.minLength(3)]],
      district: ['',[Validators.required,Validators.pattern(GlobalConstants.firstLastNameRegex),Validators.maxLength(50),Validators.minLength(3)]],
      state: ['',[Validators.required,Validators.pattern(GlobalConstants.firstLastNameRegex),Validators.maxLength(50),Validators.minLength(3)]],
      gst_num: ['',[Validators.required,Validators.pattern(GlobalConstants.nameRegex),Validators.maxLength(50),Validators.minLength(3)]],
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
