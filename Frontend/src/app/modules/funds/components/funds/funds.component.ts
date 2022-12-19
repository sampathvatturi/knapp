import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { GlobalConstants } from 'src/app/shared/global_constants';
import { formatDate } from '@angular/common';
import { FundsService } from 'src/app/services/funds.service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  fund_info: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  fundsForm!: FormGroup;
  searchText = '';
  user_data: any;
  fundId: any;
  dateFormat = 'dd/MM/yyyy';
  currentDate = new Date();
  editAmount: any;
  updateBtnDisable:boolean = true;
  isLoading:boolean = true;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService,
    private fundService: FundsService,

  ) { }

  ngOnInit(): void {
    this.fundsFormValidators();
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getFunds();
    console.log(this.currentDate);
  }

  getFunds(): void {
    this.fundService.getFunds().subscribe((res) => {
      this.fund_info = res;
      this.isLoading = false;
    })
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Fund Details';
    this.visible = true;
    this.fundsFormValidators();
    this.fundsForm.get('fund_type')?.setValue('state');
  }

  edit(type:any,data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Fund Details';
    this.visible = true;
    this.fundId = data?.fund_id;
    this.editAmount = data?.fund_value;
    this.fundsFormValidators();
    this.fundsForm.get('fund_type')?.setValue(data.fund_type);
    this.fundsForm.get('fund_description')?.setValue(data.fund_description);
    this.fundsForm.get('transaction_mode')?.setValue(data.transaction_mode);
    this.fundsForm.get('fund_value')?.setValue(data.fund_value);
    this.fundsForm.get('fund_released_date')?.setValue(data.fund_released_date);
    this.fundsForm.get('created_by')?.setValue(this.user_data.user_id);
    this.fundsForm.get('updated_by')?.setValue(this.user_data.user_id);
    this.updateBtnDisable = true;
    if (type === 'view'){
      this.updateBtnDisable = false;
    }
  }

  close(): void {
    this.visible = false;
  }

  prepareFundPayload(data: any) {
    const payload = {
      fund_type: data.fund_type,
      fund_description: data.fund_description,
      fund_released_date: data.fund_released_date,
      transaction_mode: data.transaction_mode,
      fund_value: data.fund_value,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }
  
  onCreateSubmit() {
    if (this.fundsForm.valid) {
      this.fundsForm.value.fund_released_date = formatDate(this.fundsForm.value.fund_released_date, 'yyyy-MM-dd hh:mm:ss', this.locale);
      this.fundService.createFund(this.prepareFundPayload(this.fundsForm.value)).subscribe((res) => {
        this.visible = false;
        this.getFunds();
        this.notification.createNotification("success", res?.message);
      });
    } else {
      Object.values(this.fundsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUpdatePayload(data:any){
    const payload = {
      fund_type: data.fund_type,
      fund_description: data.fund_description,
      fund_released_date: data.fund_released_date,
      transaction_mode: data.transaction_mode,
      fund_value: data.fund_value,
      updated_by: this.user_data?.user_id,
      diffAmount: data.fund_value - this.editAmount
    }
    return payload;
  }

  onUpdateSubmit() {
    if (this.fundsForm.valid) {
      this.fundsForm.value.fund_released_date = formatDate(this.fundsForm.value.fund_released_date, 'yyyy-MM-dd hh:mm:ss', this.locale);
      this.fundService.updateFund(this.fundId,this.prepareUpdatePayload(this.fundsForm.value)).subscribe((res) => {
        this.notification.createNotification("success", res?.message);
        this.visible = false;
        this.getFunds();
      });
    } else {
      Object.values(this.fundsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  fundsFormValidators() {
    this.fundsForm = this.fb.group({
      fund_type: ['', [Validators.required]],
      fund_description: ['', [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(10),
      Validators.pattern(GlobalConstants.nameRegex)]],
      fund_released_date: [this.currentDate, [Validators.required]],
      transaction_mode: ['banking', [Validators.required]],
      fund_value: ['', [Validators.required]],
    });
  }

}
