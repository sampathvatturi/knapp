import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { TenderDetailsService } from 'src/app/services/tender-details.service';
import { TransactionDetailsService } from 'src/app/services/transaction-details.service';
import { UserService } from 'src/app/services/user.service';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {

  validateForm!: UntypedFormGroup;
  listOfData: any[] = [];
  tenders: any[] = [];
  tendersData: any = [];
  searchText = '';
  isVisible = false;
  users: any = [];
  userStatusList: any = [];
  currentTenderData: any = [];
  userStatus: any;
  user_data: any;
  currentUserId: any;
  tenderUserStatusList: any=[];
  reason: any;
  currentTenderId: any;
  works_info:any = [];
  allUsersApprovedStatus: boolean = false;
  

  constructor(
    private fb: UntypedFormBuilder,
    private notification: NotificationService,
    private tenderService: TenderDetailsService,
    private userService: UserService,
    private works:WorksService
  ) { }

  ngOnInit(): void {    
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.currentUserId = this.user_data?.user_id;
    this.validateForm = this.fb.group({
      rangePicker: [null],
      type: ['tenders', [Validators.required]],
      status: ['open', [Validators.required]],
    });
    this.getVendorTenders();
    this.getUsers();
    this.getWorks();
  }
  
  getVendorTenders(action?: any): void {
    this.tenderService.getVendorTenders().subscribe((res) => {
      this.tenders = res;
      if(action) {        
        this.getTendersData();
      }
    })
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }
  getWorks(){
    this.works.getWorks().subscribe((res) => {
      this.works_info = res;
    })
  }

  workIdToName(id:any){
    let arr = id.split(',');
    for (let index = 0; index < arr.length; index++) {
      this.works_info.forEach((element:any) => {
        if (element.work_id == Number(arr[index])){
          arr[index]= element.work_name;
        }
      })
      
    }
    return arr.join(', ');
  }

  submitForm(): void {
    console.log(this.validateForm.value);
    if(this.validateForm.value.type === 'tenders') {
      this.getTendersData();
    }
  } 

  getTendersData(): void {
    this.tendersData = this.tenders.filter((item) => item.status === this.validateForm.value.status);
    console.log("this.tendersData:", this.tendersData);
  }

  onClickApprove(data: any): void {
    this.currentTenderData = data;
    this.userApprovalList(data);
  }

  userApprovalList(item: any): void {
    this.userStatusList = item?.tender_user_status;
    this.currentTenderId = item?.id;
    console.log(this.userStatusList);
    this.users.forEach((user: any) => {
      this.userStatusList.map((item: any) => {
        if(user?.user_id === item?.user_id){
          item.user_name = user?.user_name;
          item.user_full_name = user?.first_name + " " + user?.last_name;
        }
        if(item.user_id === this.currentUserId) {
          this.userStatus = item?.status;
        }
      });
    });    
    this.isVisible = true;
    console.log("userStatusList::",this.userStatusList);
  }

  handleOk(): void {
    console.log('Button ok clicked!', this.userStatus, this.userStatusList);
    this.tenderUserStatusList=[]; 
    this.userStatusList.forEach((user: any) => {
      const obj = {
        user_id: user?.user_id,
        status: (user?.user_id === this.currentUserId) ? this.userStatus : user?.status,
        reason: (user?.user_id === this.currentUserId && this.userStatus === 'Rejected') ? this.reason : ''
      }
      this.tenderUserStatusList.push(obj);      
    });
    console.log('tenderUserStatusList :: ', this.tenderUserStatusList);
    this.tenderUserStatusList.filter((item: any) => (item?.status==='Pending' || item?.status==='Rejected'))
    this.updateTenderUserStatus();
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  prepareUpdatePayload() {
    this.allUsersApprovedStatus = this.tenderUserStatusList.every((item: any) => item.status === 'Approved');
    console.log("allUsersApprovedStatus", this.allUsersApprovedStatus);
    const payload = {
      tender_user_status: this.tenderUserStatusList,
      updated_by: this.user_data?.user_id,
      status: this.allUsersApprovedStatus ? 'accept' : this.currentTenderData?.status
    }
    return payload;
  }

  updateTenderUserStatus(): void {
    if (this.userStatus === 'Rejected' && !this.reason) {      
      this.notification.createNotification('error', 'Please enter a reson');
    }
    else {
      this.tenderService.updateTenderUserStatus(this.currentTenderId, this.prepareUpdatePayload()).subscribe((res) => {
        this.notification.createNotification("success", res?.message);
        this.isVisible = false;
        this.getVendorTenders('update');
      })
    }
  }

}
