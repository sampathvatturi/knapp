import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { GlobalConstants } from 'src/app/shared/global_constants';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  visible = false;
  submit = true;
  drawerTitle: string = '';
  accountsForm!: FormGroup;
  accounts_info:any = [];
  user_data:any = [];
  searchText = '';
  errTip = '';
  accountsId:any;
  updateBtnDisable:boolean = true;

  constructor(
    private fb: UntypedFormBuilder,
    private notification:NotificationService
  ) { }

  ngOnInit(): void {
    this.accountsFormValidators();
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getAccounts();
    this.accounts_info = [{account_name:"Electricity"},{account_name:"Salaries"}]

  }
  getAccounts():void{
    //for service
  }

  create():void{
    this.submit = true;
      this.drawerTitle = 'Add Account';
      this.visible = true;
      this.accountsFormValidators();
  }
  edit(type:any,data: any){
    this.submit = false;
      this.drawerTitle = 'Edit Accounts';
      this.visible = true;
      this.accountsId = data?.account_id;
      this.accountsFormValidators();
      this.accountsForm.get('account_name')?.setValue(data.account_name);
      this.updateBtnDisable = true;
      if (type === 'view'){
        this.updateBtnDisable = false;
      }
  }
  close(){
    this.visible = false;
  }

  prepareaccountsPayload(data:any){
    const payload = {
      account_name:data.account_name,
      created_by:this.user_data.user_id,
      updated_by:this.user_data?.user_id
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.accountsForm.valid){
      //service
    }
    else {
      console.log('invalid')
      Object.values(this.accountsForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  prepareUpdatePayload(data:any){
    const payload = {
      account_name:data.account_name,
      updated_by:this.user_data?.user_id
    }
    return payload;
  }
  onUpdateSubmit() {
    if (this.accountsForm.valid) {
      //service
    } else {
        console.log('invalid')
        Object.values(this.accountsForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
  }

  accountsFormValidators(){
    this.accountsForm = this.fb.group({
      account_name:['',[Validators.required,Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(3),Validators.maxLength(50)]]
    })
  }
}
