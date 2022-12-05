import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';

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
  constructor(private fb: UntypedFormBuilder, private api: ApiService,private notification:NotificationService) {}

  ngOnInit(): void {
    this.vendorForm = this.fb.group({
      vendor_id: [{ value: ''}],
      vendor_name: [''],
      phone_number:[''],
      address:[''],
      status:[''],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: [''],
    });

    this.api.getCall('/vendor/getVendors').subscribe((items) =>{
      this.vendor_info = items;
      console.log(this.vendor_info);
    })

    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
  }

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit';
    this.visible = true;
    this.vendorForm = this.fb.group({
      vendor_id: [
        data.vendor_id,
        [Validators.required],
      ],
      vendor_name: [data.vendor_name, [Validators.required]],
      address: [data.address, [Validators.required]],
      status: [data.status, [Validators.required]],
      phone_number:[data.phone_number,[Validators.required]],
      updated_by: [this.user_data.user_id],
    });
  }
  open(): void {
    this.submit = true;
    this.drawerTitle = 'New';
    this.visible = true;
    this.vendorForm = this.fb.group({
      vendor_id: [''],
      vendor_name: ['', [Validators.required]],
      phone_number:[''],
      address:[''],
      status:[''],

      created_by: [this.user_data.user_id],

      updated_by: [this.user_data.user_id],
    });
  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {
    console.log(this.vendorForm);
    this.api.postCall('/vendor/createVendor', this.vendorForm.value).subscribe();
    this.visible = false;

    this.api.getCall('/vendor/getVendors').subscribe((items) =>{
      this.vendor_info = items;
      console.log(this.vendor_info);
    })
  }
  update() {
    console.log(this.vendorForm.value.vendor_id)
    this.api.patchCall('/vendor/updateVendor/'+this.vendorForm.value.vendor_id,this.vendorForm.value).subscribe((res) =>{
      this.notification.createNotification(res.status,res.message);

      this.api.getCall('/vendor/getVendors').subscribe((items) =>{
        this.vendor_info = items;
        console.log(this.vendor_info);
      })

    });
    this.visible = false;
  }
}
