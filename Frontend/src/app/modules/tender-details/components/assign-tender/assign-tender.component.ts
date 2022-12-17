import { Component, OnInit } from '@angular/core';
import { VendorsService } from 'src/app/services/vendors.service';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalConstants } from 'src/app/shared/global_constants';
import { UserService } from 'src/app/services/user.service';
import { TenderDetailsService } from 'src/app/services/tender-details.service';
import { NotificationService } from 'src/app/services/auth/notification.service';


@Component({
  selector: 'app-assign-tender',
  templateUrl: './assign-tender.component.html',
  styleUrls: ['./assign-tender.component.css']
})
export class AssignTenderComponent implements OnInit {
  visible = false;
  submit = true;
  drawerTitle: string = '';
  assignTendersForm!: FormGroup;
  tender_info: any = [];
  vendors: any = [];
  tenders:any = [];
  departmentUsers: any[] = [];
  updateBtnDisable:boolean = true;
  user_data: any = [];
  searchText = '';
  tenderId: any;

  constructor(
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private vendor: VendorsService,
    private user: UserService,
    private tender:TenderDetailsService,
    private notification :NotificationService
  ) { }

  ngOnInit(): void {
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.assignTendersFormValidators();
    this.getVendor();
    this.getUser();
    this.getTender();
  }

  getTender(){
    this.tender.getTenderDetails().subscribe((res) => {
      this.tenders = res
      console.log(this.tenders)
    })
  }

  getVendor() {
    this.vendor.getVendors().subscribe((res) => {
      this.vendors = res;
    });
  }

  getUser() {
    this.user.getAllUsers().subscribe((res) => {
      res.forEach((data: any) => {
        let temp = {
          label: data.first_name + ' ' + data.last_name,
          value: data.user_id,
          groupLabel: data.department_name + '  -  ' + data.ranking,
        };
        this.departmentUsers.push(temp);
      });
    })
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Assign Tender';
    this.visible = true;
    this.assignTendersFormValidators();
    this.assignTendersForm.get('status')?.setValue('open');
    console.log(this.tenders.description)
  }

  edit(type:any,data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Assign Tenders';
    this.visible = true;
    this.assignTendersFormValidators();
    // this.tenderId = data?.ticket_id;
    let selectedUsers: any[] = [];
    if (data.json_status != '' && data.json_status != null) {
      JSON.parse(data.json_status).forEach((x: any) => {
        selectedUsers.push(x.user_id);
      });
    }
    else selectedUsers = [];
    this.assignTendersForm.get('tender_id')?.setValue(data.ticket_id);
    this.assignTendersForm.get('vendor_id')?.setValue(data.vendor_id.toString());
    this.assignTendersForm.get('description')?.setValue(data.description);
    this.assignTendersForm.get('tender_user_status')?.setValue(selectedUsers);
    this.assignTendersForm.get('tender_cost')?.setValue(data.tender_cost);
    this.assignTendersForm.get('status')?.setValue(data.status);
    this.updateBtnDisable = true;
    if (type === 'view'){
      this.updateBtnDisable = false;
    }
  }

  close(): void {
    this.visible = false;
  }

  showTender(){
    this.tenders.forEach((element:any) =>{
      if (element.id == this.assignTendersForm.value.tender_id){
        this.tenderId = element.id
        this.assignTendersForm.get('description')?.setValue(element.description);
        this.assignTendersForm.get('tender_cost')?.setValue(element.tender_cost);
      }
    })
  }

  prepareTendorPayload(data: any) {
    const payload = {
      description: data.description,
      tender_id:data.tender_id,
      vendor_id: data.vendor_id,
      tender_cost: data.tender_cost,
      tender_user_status: data.tender_user_status,
      status: data.status,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.assignTendersForm.valid) {
      //service
      this.tender.assignTender(this.tenderId,this.assignTendersForm.value).subscribe(res=>{
        if(res.status == 'success')
          this.notification.createNotification('success',res.message);
        else
          this.notification.createNotification('error',res.message);
      })
    // console.log(this.assignTendersForm.value)

    }
    else {
      Object.values(this.assignTendersForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUpdatePayload(data: any) {
    const payload = {
      description: data.description,
      tender_id:data.tender_id,
      vendor_id: data.vendor_id,
      tender_cost: data.tender_cost,
      tender_user_status: data.tender_user_status,
      status: data.status,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onUpdateSubmit() {
    if (this.assignTendersForm.valid) {
      this.assignTendersForm.value.work_id = this.assignTendersForm.value.work_id.toString();
      //service
      // this.tendersapi.updateTenderDetail(this.tenderId,this.createTenderForm.value).subscribe(res=>{
      //   if(res.status == 'success'){
      //     this.notification.createNotification('success',res.message);
      //     this.visible = false;
      //   }else{
      //     this.notification.createNotification('error',res.message);
      //   }
      // })
    }
    else {
      console.log('invalid')
      Object.values(this.assignTendersForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  assignTendersFormValidators() {
    this.assignTendersForm = this.fb.group({
      tender_id: [null, [Validators.required, Validators.pattern(GlobalConstants.addressRegex)]],
      description: [null, [Validators.required, Validators.pattern(GlobalConstants.addressRegex)]],
      vendor_id: [null, [Validators.required]],
      tender_cost: [null, [Validators.required]],
      tender_user_status: [[], [Validators.required]],
      status: [null],
    });
  }
}
