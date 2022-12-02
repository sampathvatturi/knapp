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
  listOfData: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  invoiceForm!: FormGroup;
  invoice_info: any = [];
  vendor_array: any = [];
  depts: any = [];
  user_data: any = [];
  searchText = '';

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
    });

    this.api.getCall('/invoicedetails/getInvoicelogs').subscribe((res) => {
      this.invoice_info = res;
    });

    this.api.getCall('/vendor/getVendors').subscribe((res) => {
      this.vendor_array = res;
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
      department_id: [data.department_id, [Validators.required]],
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
  vendorName(id: any) {
    this.vendor_array.map((elem: any) => {
      if (elem.vendor_id === id) {
        console.log(elem.vendor_name);
        return elem.vendor_name;
      }
    });
  }
}
