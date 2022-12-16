import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { TransactionDetailsService } from 'src/app/services/transaction-details.service';
import { GlobalConstants } from 'src/app/shared/global_constants';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
transactions = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  transactionsForm!: FormGroup;
  user_data: any;
  searchText = '';
  transId: any;
  updateBtnDisable: boolean = false;
  editAmount: any;

  constructor(
    private fb: UntypedFormBuilder,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.transactionsFormValidators();

  }
  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Transaction';
    this.visible = true;
    this.transactionsFormValidators();
  }
  
  prepareCreatePayload(data: any) {
    const payload = {
      acc_head:data.acc_head,
        remarks:data.remarks,
        mode:data.mode,
        amount:data.amount,
        trsxcn_date:data.trsxcn_date,
        ref_acc_head:data.ref_acc_head,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.transactionsForm.valid) {
      //service
    } else {
      Object.values(this.transactionsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUpdatePayload(data:any){
    const payload = {
      acc_head: data.acc_head,
      ref_acc_head: data.ref_acc_head,
      remarks: data.remarks,
      mode: data.mode,
      amount: data.amount,
      updated_by: this.user_data?.user_id,
    }
    return payload;
  }


  edit(data: any) {
    this.transId = data?.trsxcn_id;
    this.editAmount = data?.amount;
    this.submit = false;
    this.drawerTitle = 'Edit Transaction';
    this.visible = true;
    this.transactionsFormValidators();
    this.transactionsForm.get('acc_head')?.setValue(data.acc_head);
    this.transactionsForm.get('ref_acc_head')?.setValue(data.ref_acc_head);
    this.transactionsForm.get('remarks')?.setValue(data.remarks);
    this.transactionsForm.get('mode')?.setValue(data.mode);
    this.transactionsForm.get('amount')?.setValue(data.amount);
  }

  onUpdateSubmit() {
    if (this.transactionsForm.valid) {
        //service
    } else {
      Object.values(this.transactionsForm.controls).forEach((control) => {
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
    this.transactionsForm = this.fb.group({
      acc_head: ['', [Validators.required]],
      remarks: ['', [Validators.required]],
      mode: ['electricity' , [Validators.required] ],
      amount: ['', [Validators.required]],
      trsxcn_date: ['', [Validators.required]],
      ref_acc_head:['',[Validators.required]]
    });
  }

}
