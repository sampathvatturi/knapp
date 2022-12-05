import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from './../../../../services/auth/notification.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit {
  
  visible = false;
  submit = true;
  drawerTitle: string = '';
  invoiceForm!: FormGroup;
  invoice_info: any = [];
  vendor_array: any = [];
  v_name:any = {};
  depts: any = [];
  user_data: any = [];
  searchText = '';
  d_name:any = {};
  quant :any ;
  amt: any
  tot:any
  tx:any;

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      invoice_details_id: [''],
      vendor_id: [''],
      invoice_item: [''],
      quantity: [''],
      amount: [''],
      trnsx_type: [''],
      tax: [''],
      total: [''],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: [''],
      department_id: [''],
    });

    this.api.getCall('/dept/getDepts').subscribe((res) => {
      this.depts = res;
      for (let x of this.depts){
        this.d_name[x.department_id] = x.department_name;
      }
      console.log(this.d_name)
    });

    this.api.getCall('/invoicedetails/getInvoicelogs').subscribe((res) => {
      this.invoice_info = res;
    });

    this.api.getCall('/vendor/getVendors').subscribe((res) => {
      this.vendor_array = res;
      for (let x of this.vendor_array){
        this.v_name[x.vendor_id] = x.vendor_name
      }
    });

    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
  }

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit';
    this.visible = true;
    this.invoiceForm = this.fb.group({
      invoice_details_id: [data.invoice_details_id, [Validators.required]],
      vendor_id: [data.vendor_id, [Validators.required]],
      invoice_item: [data.invoice_item, [Validators.required]],
      quantity: [data.quantity, [Validators.required]],
      amount: [data.amount, [Validators.required]],
      trnsx_type: [data.trnsx_type, [Validators.required]],
      tax: [data.tax, [Validators.required]],
      total: [data.total, [Validators.required]],
      updated_by: [data.updated_by, [Validators.required]],
      department_id: [data.department_name, [Validators.required]],
    });
    console.log(this.invoiceForm.value)
  }
  
  open(): void {
    this.submit = true;
    this.drawerTitle = 'New';
    this.visible = true;
    
    this.invoiceForm = this.fb.group({
      invoice_details_id: [''],
      vendor_id: [''],
      invoice_item: [''],
      quantity: [''],
      amount: [''],
      trnsx_type: [''],
      tax: [''],
      total: [0],
      created_by: [this.user_data.user_id],
      updated_by: [this.user_data.user_id],
      department_id: [''],
    });
  }

  change(){
    this.tot = (this.invoiceForm.value.quantity * this.invoiceForm.value.amount) + 
    (this.invoiceForm.value.tax*this.invoiceForm.value.quantity*this.invoiceForm.value.amount)/100;

    this.invoiceForm = this.fb.group({
      invoice_details_id: [this.invoiceForm.value.invoice_details_id],
      vendor_id: [this.invoiceForm.value.vendor_id],
      invoice_item: [this.invoiceForm.value.invoice_item],
      quantity: [this.invoiceForm.value.quantity],
      amount: [this.invoiceForm.value.amount],
      trnsx_type: [this.invoiceForm.value.trnsx_type],
      tax: [this.invoiceForm.value.tax],
      total: [{value:this.tot,disabled:false},],
      created_by: [this.user_data.user_id],
      updated_by: [this.user_data.user_id],
      department_id: [this.invoiceForm.value.department_id],
    });
  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {
    console.log(this.invoiceForm);
    this.api
      .postCall('/invoicedetails/createInvoicelog', this.invoiceForm.value)
      .subscribe((res) => {
        this.notification.createNotification(res.status, res.message);
        if (res.status === 'success') {
          this.visible = false;
          this.api
            .getCall('/invoicedetails/getInvoicelogs')
            .subscribe((items) => {
              this.invoice_info = items;
            });
        }
      });
  }
  update() {
    this.api
      .patchCall(
        `/invoicedetails/updateInvoicelog/${this.invoiceForm.value.invoice_details_id}`,
        this.invoiceForm.value
      )
      .subscribe((res) => {
        this.notification.createNotification(res.status, res.message);
        if (res.status === 'success') {
          this.visible = false;
          this.api
            .getCall('/invoicedetails/getInvoicelogs')
            .subscribe((items) => {
              this.invoice_info = items;
              console.log(this.invoice_info);
            });
        }
      });
  }
  // vendorName(id: any) {
  //   this.vendor_array.map((elem: any) => {
  //     if (elem.vendor_id === id) {
  //       console.log(elem.vendor_name);
  //       return elem.vendor_name;
  //     }
  //   });
  // }
}
