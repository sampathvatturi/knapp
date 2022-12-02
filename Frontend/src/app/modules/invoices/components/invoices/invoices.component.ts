import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  listOfData: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  invoiceForm!: FormGroup;
  invoice_info:any = [];
  vendor_array:any = [];
  depts:any = [];
  user_data:any = [];

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      invoice_details_id :[''],
      vendor_id:[''],
      invoice_item:[''],
      quantity:[''],
      amount:[''],
      trnsx_type:[''],
      tax:[''],
      total:[''],
      created_date:[''],
      created_by:[''],
      updated_date:[''],
      updated_by:[''],
      department_id:['']
    });

    this.api.getCall('/dept/getDepts').subscribe((list) => {
      this.depts = list;
    });

    

    this.api.getCall('/invoicedetails/getInvoicelogs').subscribe((items) => {
      this.invoice_info = items
      console.log(this.invoice_info);
    })

    this.api.getCall('/vendor/getVendors').subscribe((items) => {
      this.vendor_array = items;
    })

    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);

  }
  

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit';
    this.visible = true;
    this.invoiceForm = this.fb.group({
      invoice_details_id: [{value:data.invoice_id}, [Validators.required]],
      vendor_id: [{value:data.vendor_id}, [Validators.required]],
      invoice_item: [{value:data.invoice_item}, [Validators.required]],
      quantity: [{value:data.quantity}, [Validators.required]],
      amount: [data.amount, [Validators.required]],
      trnsx_type: [{value:data.trnsx_type}, [Validators.required]],
      tax: [data.tax, [Validators.required]],
      total: [data.total, [Validators.required]],
      updated_by: [data.updated_by, [Validators.required]],
      department_id: [data.updated_by, [Validators.required]],

    });
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
      total: [''], 
      
      created_by: [this.user_data.user_id],
      
      updated_by: [this.user_data.user_id],
      department_id: [''],
      
    });
  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {
    console.log(this.invoiceForm);
    this.api.postCall('/invoicedetails/createInvoicelog', this.invoiceForm.value).subscribe();
    this.visible = false;
    // this.api.getCall('/dept').subscribe((list) => {
    //   this.listOfData = list;
    // });
    this.api.getCall('invoicedetails/getInvoicelogs').subscribe((items) => {
      this.invoice_info = items
      console.log(this.invoice_info);
    })

  }
  update() {
    this.api.patchCall(`invoicedetails/updateInvoicelog/${this.invoiceForm.value.invoice_details_id}` , this.invoiceForm.value).subscribe();
    this.visible = false;

    this.api.getCall('/invoicedetails/getInvoicelogs').subscribe((items) => {
      this.invoice_info = items
      console.log(this.invoice_info);
    })
    
  }
}
