import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DepartmentService } from 'src/app/services/department.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { VendorsService } from 'src/app/services/vendors.service';
import { NotificationService } from './../../../../services/auth/notification.service';
import { GlobalConstants } from 'src/app/shared/global_constants';

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
  v_name: any = {};
  depts: any = [];
  user_data: any = [];
  searchText = '';
  d_name: any = {};
  quant: any;
  amt: any;
  tot: any;
  tx: any;

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService,
    private invoice: InvoicesService,
    private departments: DepartmentService,
    private vendors: VendorsService
  ) {}

  ngOnInit(): void {
    this.invoiceFormValidators();

    this.departments.getDepartments().subscribe((res) => {
      this.depts = res;
      for (let x of this.depts) {
        this.d_name[x.department_id] = x.department_name;
      }
    });

    this.invoice.getInvoices().subscribe((res) => (this.invoice_info = res));

    this.vendors.getVendors().subscribe((res) => {
      this.vendor_array = res;
      for (let x of this.vendor_array) {
        this.v_name[x.vendor_id] = x.vendor_name;
      }
    });

    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
  }

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Invoice details';
    this.visible = true;
    this.invoiceFormValidators();
    this.invoiceForm
      .get('invoice_details_id')
      ?.setValue(data.invoice_details_id);
    this.invoiceForm.get('vendor_id')?.setValue(data.vendor_id.toString());
    this.invoiceForm.get('invoice_item')?.setValue(data.invoice_item);
    this.invoiceForm.get('quantity')?.setValue(data.quantity);
    this.invoiceForm.get('amount')?.setValue(data.amount);
    this.invoiceForm.get('trnsx_type')?.setValue(data.trnsx_type);
    this.invoiceForm.get('tax')?.setValue(data.tax);
    this.invoiceForm.get('total')?.setValue(data.total);
    this.invoiceForm.get('updated_by')?.setValue(this.user_data.user_id);
    this.invoiceForm
      .get('department_id')
      ?.setValue(data.department_id.toString());
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add New Invoice';
    this.visible = true;
    this.invoiceFormValidators();
    this.invoiceForm.get('created_by')?.setValue(this.user_data.user_id);
    this.invoiceForm.get('updated_by')?.setValue(this.user_data.user_id);
    this.invoiceForm.get('total')?.setValue(0);
  }

  change() {
    this.tot =
      this.invoiceForm.value.quantity * this.invoiceForm.value.amount +
      (this.invoiceForm.value.tax *
        this.invoiceForm.value.quantity *
        this.invoiceForm.value.amount) /
        100;

    this.invoiceForm
      .get('invoice_details_id')
      ?.setValue(this.invoiceForm.value.invoice_details_id);
    this.invoiceForm
      .get('vendor_id')
      ?.setValue(this.invoiceForm.value.vendor_id);
    this.invoiceForm
      .get('invoice_item')
      ?.setValue(this.invoiceForm.value.invoice_item);
    this.invoiceForm.get('quantity')?.setValue(this.invoiceForm.value.quantity);
    this.invoiceForm.get('amount')?.setValue(this.invoiceForm.value.amount);
    this.invoiceForm
      .get('trnsx_type')
      ?.setValue(this.invoiceForm.value.trnsx_type);
    this.invoiceForm.get('tax')?.setValue(this.invoiceForm.value.tax);
    this.invoiceForm.get('total')?.setValue(this.tot);
    this.invoiceForm.get('updated_by')?.setValue(this.user_data.user_id);
    this.invoiceForm.get('created_by')?.setValue(this.user_data.user_id);
    this.invoiceForm
      .get('department_id')
      ?.setValue(this.invoiceForm.value.department_id);
  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {
    if (this.invoiceForm.valid) {
      this.api
        .postCall('/invoicedetails/createInvoicelog', this.invoiceForm.value)
        .subscribe((res) => {
          this.notification.createNotification(res.status, res.message);
          if (res.status === 'success') {
            this.visible = false;
            this.invoice
              .getInvoices()
              .subscribe((res) => (this.invoice_info = res));
          } else {
            this.notification.createNotification(res.status, res.message);
          }
        });
    } else {
      Object.values(this.invoiceForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  onUpdate() {
    this.invoiceForm.value.department_id = this.invoiceForm.value.department_id.toString();
    if (this.invoiceForm.valid){
      this.api
      .patchCall(
        `/invoicedetails/updateInvoicelog/${this.invoiceForm.value.invoice_details_id}`,
        this.invoiceForm.value
      )
      .subscribe((res) => {
        this.notification.createNotification(res.status, res.message);
        if (res.status === 'success') {
          this.visible = false;

          this.invoice
            .getInvoices()
            .subscribe((res) => (this.invoice_info = res));
        } else {
          this.notification.createNotification(res.status, res.message);
        }
      });
    }
    else {
      
      Object.values(this.invoiceForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  invoiceFormValidators() {
    this.invoiceForm = this.fb.group({
      invoice_details_id: [''],
      vendor_id: ['', [Validators.required]],
      invoice_item: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(200),Validators.pattern(GlobalConstants.nameRegex)]],
      quantity: ['', [Validators.required,Validators.pattern(GlobalConstants.amountNumberRegex)]],
      amount: ['', [Validators.required,Validators.pattern(GlobalConstants.amountNumberRegex)]],
      trnsx_type: ['', [Validators.required]],
      tax: ['', [Validators.required,Validators.pattern(GlobalConstants.amountNumberRegex)]],
      total: ['', [Validators.required]],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: [''],
      department_id: ['', [Validators.required]],
    });
  }
}
