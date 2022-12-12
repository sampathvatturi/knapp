import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { TransactionDetailsService } from 'src/app/services/transaction-details.service';
import { GlobalConstants } from 'src/app/shared/global_constants';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  transactions = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  transationForm!: FormGroup;
  user_data: any;
  searchText = '';
  transId: any;

  constructor(
    private fb: UntypedFormBuilder,
    private notification: NotificationService,
    private transactionDetailsService: TransactionDetailsService
  ) { }

  ngOnInit(): void {
    this.transactionsFormValidators();
    this.getTransactions();
  }

  getTransactions(): void {    
    this.transactionDetailsService.getTransactions().subscribe( res =>{
      this.transactions = res;
    })
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Transaction';
    this.visible = true;
    this.transactionsFormValidators();
  }
  
  prepareCreatePayload(data: any) {
    const payload = {
      trsxcn_from: data.trsxcn_from,
      trsxcn_to: data.trsxcn_to,
      category: data.category,
      type: data.type,
      remarks: data.remarks,
      mode: data.mode,
      amount: data.amount,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.transationForm.valid) {
      this.transactionDetailsService.createTransaction(this.prepareCreatePayload(this.transationForm.value)).subscribe((res) => {
        this.visible = false;
        this.getTransactions();
        this.notification.createNotification("success", res?.message);
      });
    } else {
      Object.values(this.transationForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUpdatePayload(data:any){
    const payload = {
      trsxcn_from: data.trsxcn_from,
      trsxcn_to: data.trsxcn_to,
      category: data.category,
      type: data.type,
      remarks: data.remarks,
      mode: data.mode,
      amount: data.amount,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }


  edit(data: any) {
    this.transId = data?.trsxcn_id
    this.submit = false;
    this.drawerTitle = 'Edit Transaction Details';
    this.visible = true;
    this.transactionsFormValidators();
    this.transationForm.get('trsxcn_from')?.setValue(data.trsxcn_from);
    this.transationForm.get('trsxcn_to')?.setValue(data.trsxcn_to);
    this.transationForm.get('category')?.setValue(data.category);
    this.transationForm.get('type')?.setValue(data.type);
    this.transationForm.get('remarks')?.setValue(data.remarks);
    this.transationForm.get('mode')?.setValue(data.mode);
    this.transationForm.get('amount')?.setValue(data.amount);
  }

  onUpdateSubmit() {
    if (this.transationForm.valid) {
        this.transactionDetailsService.updateTransaction(this.transId,this.prepareUpdatePayload(this.transationForm.value)).subscribe((res) => {
        this.notification.createNotification("success", res?.message);
        this.visible = false;
        this.getTransactions();
      });
    } else {
      Object.values(this.transationForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  close(): void {
    this.visible = false;
  }

  transactionsFormValidators() {
    this.transationForm = this.fb.group({
      trsxcn_from: ['', [Validators.required]],
      trsxcn_to: ['', [Validators.required]],
      category: ['electricity' , [Validators.required] ],
      amount: ['', [Validators.required]],
      mode: ['banking', [Validators.required]],
      type: ['debit', [Validators.required]],
      remarks: ['']
    });
  }

}
