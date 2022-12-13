import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DepartmentService } from 'src/app/services/department.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { VendorsService } from 'src/app/services/vendors.service';
import { NotificationService } from './../../../../services/auth/notification.service';
import { GlobalConstants } from 'src/app/shared/global_constants';
import { TenderDetailsService } from 'src/app/services/tender-details.service';

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
  invoiceForm1!: UntypedFormGroup;
  invoice_info: any = [];
  vendor_array: any = [];
  tender_array: any = [];
  v_name: any = {};
  t_name: any = {};
  depts: any = [];
  user_data: any = [];
  searchText = '';
  d_name: any = {};
  quant: any;
  amt: any;
  tot: any;
  tx: any;
  globalConstants = GlobalConstants;
  inventoryDetailsArray: any = [];

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService,
    private invoice: InvoicesService,
    private tenders:TenderDetailsService,
    private departments: DepartmentService,
    private vendors: VendorsService
  ) { }

  ngOnInit(): void {
    this.invoiceFormValidators();
    this.invoiceForm1 = this.fb.group({});

    this.departments.getDepartments().subscribe((res) => {
      this.depts = res;
      for (let x of this.depts) {
        this.d_name[x.department_id] = x.department_name;
      }
    });

    this.invoice.getInvoices().subscribe((res) => (this.invoice_info = res));
    this.tenders.getTenderDetails().subscribe(res=> {
      this.tender_array = res;
      for(let x of this.tender_array){
        this.t_name[x.id] = x.title;
      }
      console.log(this.t_name);
    });

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
    this.invoiceForm.get('remarks')?.setValue(data.remarks);
    this.invoiceForm.get('quantity')?.setValue(data.quantity);
    this.invoiceForm.get('amount')?.setValue(data.amount);
    this.invoiceForm.get('tax')?.setValue(data.tax);
    this.invoiceForm.get('grand_total')?.setValue(data.total);
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
    this.invoiceForm.get('grand_total')?.setValue(0);
  }

  change() {
    this.tot = Number(this.invoiceForm.value.amount) + Number(this.invoiceForm.value.tax);

    // this.invoiceForm.get('invoice_details_id')?.setValue(this.invoiceForm.value.invoice_details_id);
    // this.invoiceForm.get('vendor_id')?.setValue(this.invoiceForm.value.vendor_id);
    // this.invoiceForm.get('remarks')?.setValue(this.invoiceForm.value.remarks);
    // this.invoiceForm.get('quantity')?.setValue(this.invoiceForm.value.quantity);
    // this.invoiceForm.get('amount')?.setValue(this.invoiceForm.value.amount);
    // this.invoiceForm.get('tax')?.setValue(this.invoiceForm.value.tax);
    this.invoiceForm.get('grand_total')?.setValue(this.tot);
    // this.invoiceForm.get('updated_by')?.setValue(this.user_data.user_id);
    // this.invoiceForm.get('created_by')?.setValue(this.user_data.user_id);
  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {
    this.addField();
    this.inventoryDetailsArray.shift();
    this.invoiceForm.value.inventory_details = this.inventoryDetailsArray;
    console.log(this.invoiceForm.value);
    if (this.invoiceForm.valid) {
      this.invoice.createInvoice(this.invoiceForm.value).subscribe(res =>{
        this.notification.createNotification(res.status, res.message);
          if (res.status === 'success') {
            this.visible = false;
            this.invoice
              .getInvoices()
              .subscribe((res) => (this.invoice_info = res));
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
    if (this.invoiceForm.valid) {
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
      invoice_id: [''],
      vendor_id: ['', [Validators.required]],
      tendor_id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      remarks: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200), Validators.pattern(GlobalConstants.nameRegex)]],
      amount: ['', [Validators.required, Validators.pattern(GlobalConstants.amountRegex)]],
      inventory_details: [null],
      tax: ['', [Validators.required, Validators.pattern(GlobalConstants.numberRegex)]],
      grand_total: ['', [Validators.required]],
    });
  }

  // dynamic form fields
  listOfControl: Array<{ id: number; controlInstance1: string; controlInstance2: string; controlInstance3: string; controlInstance4: string; }> = [];

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;
    const control = {
      id,
      controlInstance1: `item${id}`,
      controlInstance2: `quantity${id}`,
      controlInstance3: `price${id}`,
      controlInstance4: `tax${id}`
    };
    let instance = {
      item: "",
      quantity: "",
      price: "",
      tax: ""
    };

    instance.item = this.invoiceForm.value[`item${id - 1}`];
    instance.quantity = this.invoiceForm.value[`quantity${id - 1}`];
    instance.price = this.invoiceForm.value[`price${id - 1}`];
    instance.tax = this.invoiceForm.value[`tax${id - 1}`];
    this.inventoryDetailsArray.push(instance);

    const index = this.listOfControl.push(control);
    // console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.invoiceForm.addControl(
      this.listOfControl[index - 1].controlInstance1, new UntypedFormControl(null)
    );
    this.invoiceForm.addControl(
      this.listOfControl[index - 1].controlInstance2, new UntypedFormControl(null)
    );
    this.invoiceForm.addControl(
      this.listOfControl[index - 1].controlInstance3, new UntypedFormControl(null)
    );
    this.invoiceForm.addControl(
      this.listOfControl[index - 1].controlInstance4, new UntypedFormControl(null)
    );
  }

  removeField(i: { id: number; controlInstance1: string; controlInstance2: string; controlInstance3: string; controlInstance4: string; }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.inventoryDetailsArray.splice(index+1, 1);
      console.log(this.listOfControl);
      console.log(this.inventoryDetailsArray);
      this.invoiceForm.removeControl(i.controlInstance1);
      this.invoiceForm.removeControl(i.controlInstance2);
      this.invoiceForm.removeControl(i.controlInstance3);
      this.invoiceForm.removeControl(i.controlInstance4);
    }
  }
}
