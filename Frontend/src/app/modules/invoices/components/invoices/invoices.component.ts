import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { VendorsService } from 'src/app/services/vendors.service';
import { NotificationService } from './../../../../services/auth/notification.service';
import { GlobalConstants } from 'src/app/shared/global_constants';
import { TenderDetailsService } from 'src/app/services/tender-details.service';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  tender_array: any = [];
  v_name: any = {};
  t_name: any = {};
  depts: any = [];
  user_data: any = [];
  searchText = '';
  tot: any;
  tx: any;
  globalConstants = GlobalConstants;
  inventoryDetailsArray: any = [];
  files:any[]=[];
  filesDetails = {
    name : '',
    url:''
  }
  baseUrl = environment.apiUrl;
  uploadUrl = this.baseUrl+'/upload/uploadFiles';
  getUploadedFIlesUrl = this.baseUrl+'/upload/getUploadedFiles/';

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService,
    private invoice: InvoicesService,
    private tenders: TenderDetailsService,
    private vendors: VendorsService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.invoiceFormValidators();
    // this.departments.getDepartments().subscribe((res) => {
    //   this.depts = res;
    //   for (let x of this.depts) {
    //     this.d_name[x.department_id] = x.department_name;
    //   }
    // });

    this.invoice.getInvoices().subscribe((res) => (this.invoice_info = res));
    this.tenders.getTenderDetails().subscribe(res => {
      this.tender_array = res;
      for (let x of this.tender_array) {
        this.t_name[x.id] = x.title;
      }
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
    this.filesDetails.name='';
    this.filesDetails.url='';
    this.files=[];
    this.invoiceFormValidators();
    this.invoiceForm.get('vendor_id')?.setValue(data.vendor_id);
    this.invoiceForm.get('tender_id')?.setValue(data.tender_id);
    this.invoiceForm.get('title')?.setValue(data.title);
    this.invoiceForm.get('remarks')?.setValue(data.remarks);
    this.invoiceForm.get('invoice_number')?.setValue(data.invoice_number);
    this.invoiceForm.get('quantity')?.setValue(data.quantity);
    this.invoiceForm.get('status')?.setValue(data.status);
    this.invoiceForm.get('amount')?.setValue(data.amount);
    this.invoiceForm.get('tax')?.setValue(data.tax);
    this.invoiceForm.get('grand_total')?.setValue(data.total);
    this.invoiceForm.get('updated_by')?.setValue(this.user_data.user_id);
    this.invoiceForm.get('inventory_details')?.patchValue(JSON.parse(data.inventory_details));
    var fileNamesArray = data.attachments.split(',');
    if(fileNamesArray.length > 0){
      fileNamesArray.forEach((element:any) => {
        this.filesDetails.name=element;
        this.filesDetails.url=this.getUploadedFIlesUrl+element;
        this.files.push(this.filesDetails);
      });
    }
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add New Invoice';
    this.visible = true;
    this.filesDetails.name='';
    this.filesDetails.url='';
    this.files=[];
    this.invoiceFormValidators();
    this.invoiceForm.get('status')?.setValue('open');
    this.invoiceForm.get('created_by')?.setValue(this.user_data.user_id);
    this.invoiceForm.get('updated_by')?.setValue(this.user_data.user_id);
    this.invoiceForm.get('grand_total')?.setValue(0);
    this.invoiceForm.get('amount')?.setValue(0);
    this.invoiceForm.get('tax')?.setValue(0);
  }



  close(): void {
    this.visible = false;
  }
  onSubmit() {

    if (this.invoiceForm.valid) {
      var fileNames:any[] = [];
      this.files.forEach(element => {
        fileNames.push(element.name);
      });
      console.log(
        this.files
      )
      this.invoiceForm.value.attachments = fileNames.toString();
      console.log(this.invoiceForm.value.attachments)
      this.invoice.createInvoice(this.invoiceForm.value).subscribe(res => {
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
      vendor_id: ['', [Validators.required]],
      tender_id: ['', [Validators.required]],
      invoice_number: ['', [Validators.required]],
      status: ['', [Validators.required]],
      title: ['', [Validators.required]],
      remarks: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200), Validators.pattern(GlobalConstants.nameRegex)]],
      amount: ['', [Validators.required]],
      inventory_details: this.fb.array([
        this.fb.group({
          item: [''],
          quantity: [null],
          price: [null],
          taxPercent: [null],
          amt: [0],
          taxAmt: [0],
          total: [0],
        })
      ]),
      tax: ['', [Validators.required]],
      grand_total: ['', [Validators.required]],
      attachments: [''],
      created_by: [''],
      updated_by: [''],
    });
  }

  //dynamic form fields
  get inventory_details() {
    return this.invoiceForm.get("inventory_details") as FormArray
  }
  addInvertory() {
    console.log(this.inventory_details.value);
    this.inventory_details.push(this.fb.group({
      item: [''],
      quantity: [null],
      price: [null],
      taxPercent: [null],
      amt: [0],
      taxAmt: [0],
      total: [0],
    }));
  }
  removeInventory(i: any) {
    this.inventory_details.removeAt(i);
    let totalTax = 0;
    let totalAmt = 0;
    for (let i of this.invoiceForm.value.inventory_details) {
      totalTax += i.taxAmt;
      totalAmt += i.amt
    }
    this.invoiceForm.get('tax')?.setValue(totalTax);
    this.invoiceForm.get('amount')?.setValue(totalAmt);
    this.tot = Number(this.invoiceForm.value.amount) + Number(this.invoiceForm.value.tax);
    this.invoiceForm.get('grand_total')?.setValue(this.tot);
  }
  change(i: any) {
    this.inventory_details.value[i].amt = this.inventory_details.value[i].quantity * this.inventory_details.value[i].price;
    this.inventory_details.patchValue(this.setindex(i, { amt: this.inventory_details.value[i].amt }));

    this.inventory_details.value[i].taxAmt = this.inventory_details.value[i].amt * this.inventory_details.value[i].taxPercent / 100;
    this.inventory_details.patchValue(this.setindex(i, { taxAmt: this.inventory_details.value[i].taxAmt }));

    this.inventory_details.value[i].total = this.inventory_details.value[i].amt + this.inventory_details.value[i].taxAmt;
    this.inventory_details.patchValue(this.setindex(i, { total: this.inventory_details.value[i].total }));
    let totalTax = 0;
    let totalAmt = 0;
    for (let i of this.invoiceForm.value.inventory_details) {
      totalTax += i.taxAmt;
      totalAmt += i.amt
    }
    this.invoiceForm.get('tax')?.setValue(totalTax);
    this.invoiceForm.get('amount')?.setValue(totalAmt);
    this.tot = Number(this.invoiceForm.value.amount) + Number(this.invoiceForm.value.tax);
    this.invoiceForm.get('grand_total')?.setValue(this.tot);
  }
  setindex(i: any, data: any) {
    let arr = [];
    arr[i] = data;
    return arr
  }
  stable() {
    let totalTax = 0;
    let totalAmt = 0;
    for (let i of this.invoiceForm.value.inventory_details) {
      totalTax += i.taxAmt;
      totalAmt += i.amt
    }
    this.invoiceForm.get('tax')?.setValue(totalTax);
    this.invoiceForm.get('amount')?.setValue(totalAmt);
    this.tot = Number(this.invoiceForm.value.amount) + Number(this.invoiceForm.value.tax);
    this.invoiceForm.get('grand_total')?.setValue(this.tot);
  }
  //file upload
  // file:any;

  // getFile(event:any){
  //   this.file = event.target.files[0];
  // }
  // sumitdata(){
  //   let formData = new FormData();
  //   formData.set('file', this.file);

  //   this.http.post('http://localhost:4200/uploads',formData).subscribe();
  // }


  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
      this.filesDetails.name = info.file.response.fileName;
      this.filesDetails.url = this.getUploadedFIlesUrl+'/'+info.file.response.fileName;
      this.files.push(this.filesDetails);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    } else if(info.file.status !== 'uploading'){
      console.log(info.file, info.fileList);
    }
  }

  previewImage = '';
  previewVisible = false;




  handleRemove= (file: NzUploadFile) => new Observable<boolean>((obs) => {
   // console.log(file);
    // console.log('this.handleRemove instanceof Observable', this.handleRemove instanceof Observable)
    console.log(obs)
    obs.next(false)
    // this.http.post('http://localhost:8080/upload/deleteFile')
  });
}
