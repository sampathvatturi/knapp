import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts.service';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { TransactionDetailsService } from 'src/app/services/transaction-details.service';
import { TransactionsService } from 'src/app/services/transactions.service';
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
  transactionsFilterForm!:FormGroup;
  user_data: any;
  searchText = '';
  transId: any;
  updateBtnDisable: boolean = false;
  editAmount: any;
  accounts_info:any = [];
  currDate = new Date();
  accountName: any[] = [];
  acconts_heads:any =[];
  ref_acc_head:any =[];
  

  constructor(
    private fb: UntypedFormBuilder,
    private notification: NotificationService,
    private transactionsservice:TransactionsService,
    private accountHeadService:AccountsService
  ) { }

  ngOnInit(): void {
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.transactionsFormValidators();
    this.transactionsFilterFormValidators();
    this.getAccounts();
    setTimeout(() => 
    this.filterSubmit(), 1000);
    // ;
    // console.log(this.accountName['5']);
    // this.getTransactions();
  }
  // getTransactions(){
  //   this.transactionsservice.getTransactions().subscribe(res =>{
  //     this.transactions = res;
  //   })
  // }
  
  filterSubmit(){
    console.log(this.transactionsFilterForm.value)
    this.transactionsservice.getTransactions(this.transactionsFilterForm.value).subscribe((res) => {
      this.transactions = res;
      // let data={
      //   date:'',
      //   particulars:'',
      //   credit:'',
      //   debit:''
      // }
      // res.forEach((resData:any) => {
        
      // });
    })
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Transaction';
    this.visible = true;
    this.transactionsFormValidators();
    
  }
  getAccounts():void{
    this.accountHeadService.getAccountHeads().subscribe((res) =>{
      this.accounts_info = res;
      this.acconts_heads = [...res];
      this.accounts_info.unshift({
        id:'%',
        name:'All'
      })
      res.forEach((data: any) => {
        this.accountName[data.id] = data.name;
      });
    });
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
      this.transactionsservice.createTransaction(this.prepareCreatePayload(this.transactionsForm.value)).subscribe( res =>{
        this.notification.createNotification(res.status, res.message);
        // this.getTransactions();
      });
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

  transactionsFilterFormValidators(){
    let lastYear = this.currDate.getFullYear()-1;
    let currYear = this.currDate.getFullYear();
    let startDate = lastYear+'/04/01';
    let endDate = currYear+'/12/31';
    this.transactionsFilterForm = this.fb.group({
      acc_head: ['%', [Validators.required]],
      start_date: [startDate, [Validators.required]],
      end_date: [endDate, [Validators.required]],
      type: ['%', [Validators.required]],
    })
  }
  fromTo(){
    this.ref_acc_head = [];
    this.transactionsForm.get('ref_acc_head')?.setValue('');
    console.log(this.transactionsForm.value);
    this.acconts_heads.forEach((elem: any) => {
      if(elem.id != Number(this.transactionsForm.value.acc_head)){
        this.ref_acc_head.push(elem)
      }
    })
    console.log(this.ref_acc_head);
  }

}
