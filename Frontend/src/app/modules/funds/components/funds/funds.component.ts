import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { GlobalConstants } from 'src/app/shared/global_constants';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  funds: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  fundsForm!: FormGroup;
  searchText = '';
  user_data: any;
  date :any;

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService,

  ) {}

  ngOnInit(): void {
    this.fundsFormValidators();
    this.api.getCall('/fund/getFunds').subscribe((res) => {
      this.funds = res;
    });
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
  }
  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Fund Details';
    this.visible = true;
    this.fundsFormValidators();
    this.fundsForm.get('fund_type')?.setValue(data.fund_type);
    this.fundsForm.get('fund_description')?.setValue(data.fund_description);
    this.fundsForm.get('transaction_mode')?.setValue(data.transaction_mode);
    this.fundsForm.get('fund_value')?.setValue(data.fund_value);
    this.fundsForm.get('created_by')?.setValue(this.user_data.user_id);
    this.fundsForm.get('updated_by')?.setValue(this.user_data.user_id);
  }
  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Fund Details';
    this.visible = true;
    this.fundsFormValidators();
    this.fundsForm.get('fund_type')?.setValue('state');
    this.fundsForm.get('created_by')?.setValue(this.user_data.user_id);
    this.fundsForm.get('updated_by')?.setValue(this.user_data.user_id);

  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {

    if(this.fundsForm.valid){
      console.log(this.fundsForm.value);
      this.api.postCall('/fund/createFund',this.fundsForm.value).subscribe( res =>{
        this.notification.createNotification(res.status, res.message);
        this.api.getCall('/fund/getFunds').subscribe((res) => {
          this.funds = res;
        });
        this.visible = false;
      })
    }else{
      Object.values(this.fundsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    }
  onUpdate() {
    if(this.fundsForm.valid){
      console.log(this.fundsForm.value);
      this.api.patchCall(`/updateFund/${this.fundsForm.value.fund_id}`,this.fundsForm.value).subscribe(res =>{
        this.notification.createNotification(res.status, res.message);
        this.api.getCall('/fund/getFunds').subscribe((res) => {
          this.funds = res;
        });
        this.visible= false;
      })
    }else{
      Object.values(this.fundsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  fundsFormValidators(){
    this.fundsForm = this.fb.group({
      fund_type: ['', [Validators.required]],
      fund_description: ['', [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(10),
      Validators.pattern(GlobalConstants.nameRegex)]],
      fund_release_date: ['', [Validators.required]],
      transaction_mode: ['', [Validators.required]],
      fund_value: ['', [Validators.required]],
      created_by: [''],
      updated_by: [''],
    });
  }

}
