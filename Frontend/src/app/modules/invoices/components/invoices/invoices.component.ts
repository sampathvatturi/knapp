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
  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      invoice_id: [{value:'',disabled:true}],
      invoice_title: [''],
      invoice_description: [''],
      attachments: [''],
      amount: [''],
      tax_percentage: [''],
      grand_total: [''],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: [''],
      invoice_details_id: [''],

    });
    this.api.getCall('/dept/getDepts').subscribe((list) => {
      this.listOfData = list;
      console.log(this.listOfData);
    });
  }
  formArray = [{label:'Invoice Id',control:"invoice_id",holder:"Invoice Id",type:'number'},
               {label:'Invoice Title',control:"invoice_title",holder:"Invoice Title",type:'text'},
               {label:'Invoice Desp',control:"invoice_description",holder:"Invoice Description",type:'text'},
               {label:'Attachments',control:"attachments",holder:"Attachments",type:'text'},
               {label:'Amount',control:"amount",holder:"Amount",type:'number'},
               {label:'Tax Percentage',control:"tax_percentage",holder:"Tax Percentage",type:'number'},
               {label:'Grand Total',control:"grand_total",holder:"Grand Total",type:'number'},
               {label:'Invoice Details Id',control:"invoice_details_id",holder:"Invoice Details Id",type:'number'}]

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit';
    this.visible = true;
    this.invoiceForm = this.fb.group({
      invoice_id: [{value:data.invoice_id,disabled:true}, [Validators.required]],
      invoice_title: [data.invoice_title, [Validators.required]],
      invoice_description: [data.invoice_description, [Validators.required]],
      attachments: [data.attachments, [Validators.required]],
      amount: [data.amount, [Validators.required]],
      tax_percentage: [data.tax_percentage, [Validators.required]],
      grand_total: [data.grand_total, [Validators.required]],
      created_date: [data.created_date, [Validators.required]],
      created_by: [data.created_by, [Validators.required]],
      updated_date: [data.updated_date, [Validators.required]],
      updated_by: [data.updated_by, [Validators.required]],
      invoice_details_id: [data.invoice_details_id, [Validators.required]],
    });
  }
  open(): void {
    this.submit = true;
    this.drawerTitle = 'New';
    this.visible = true;
    this.invoiceForm = this.fb.group({
      invoice_id: [{value:'',disabled:true}],
      invoice_title: ['', [Validators.required]],
      invoice_description: ['', [Validators.required]],
      attachments: ['', [Validators.required]],
      amount: [''],
      tax_percentage: [''],
      grand_total: [''],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: [''],
      invoice_details_id: [''],
    });
  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {
    console.log(this.invoiceForm);
    this.api.postCall('/dept', this.invoiceForm.value).subscribe();
    this.visible = false;
    this.api.getCall('/dept').subscribe((list) => {
      this.listOfData = list;
    });
  }
  update() {
    this.api.patchCall('/dept', this.invoiceForm.value).subscribe();
    this.visible = false;
    this.api.getCall('/dept').subscribe((list) => {
      this.listOfData = list;
    });
  }
}
