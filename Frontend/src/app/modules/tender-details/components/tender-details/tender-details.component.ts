import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { WorksService } from 'src/app/services/works.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalConstants } from 'src/app/shared/global_constants';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.css'],
})
export class TenderDetailsComponent implements OnInit {
  visible = false;
  submit = true;
  drawerTitle: string = '';
  tenderDetailsForm!: FormGroup;
  tenders: any = [];
  vendors: any = [];
  user_data: any = [];
  searchText = '';
  worksDetails: any[] = [];
  worksNames: any[] = [];
  usersSelected: any[] = [];
  showUsers: any;
  departmentUsers: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService,
    private works: WorksService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.tendorsFormValidators();
    this.api.getCall('/tickets/getTickets').subscribe((res) => {
      if (res.length > 0) {
        this.tenders = res;
      } else {
        this.tenders = [];
      }
    });
    
    this.api.getCall('/vendor/getVendors').subscribe((res) => {
      this.vendors = res;
    });

    this.api.getCall('/user/getUsersByDepartment').subscribe((res) => {
      res.forEach((data: any) => {
        let temp = {
          label: data.first_name + ' ' + data.last_name,
          value: data.user_id,
          groupLabel: data.department_name + '  -  ' + data.ranking,
        };

        this.departmentUsers.push(temp);
      });
    });

    this.works.getWorks().subscribe((res: any) => {
      this.worksDetails = res;
      res.forEach((data: any) => {
        this.worksNames[data.work_id] = data.work_name;
      });
    });

    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add New Tender';
    this.visible = true;
    this.tendorsFormValidators();
    this.tenderDetailsForm.get('status')?.setValue('open');
  }

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Tender details';
    this.visible = true;

    
      this.tendorsFormValidators();
      let selectedUsers: any[] = [];
    if (data.json_status != '' && data.json_status != null) {
      JSON.parse(data.json_status).forEach((x: any) => {
        selectedUsers.push(x.user_id);
      });
    } else selectedUsers = [];

    this.tenderDetailsForm.get('ticket_id')?.setValue(data.ticket_id);
    this.tenderDetailsForm
      .get('vendor_id')
      ?.setValue(data.vendor_id.toString());
    this.tenderDetailsForm
      .get('ticket_description')
      ?.setValue(data.ticket_description);
    this.tenderDetailsForm
      .get('work_id')
      ?.setValue(data.work_id.split(',').map(Number));
    this.tenderDetailsForm.get('assign_to')?.setValue(selectedUsers);
    this.tenderDetailsForm.get('location')?.setValue(data.location);
    this.tenderDetailsForm.get('tender_cost')?.setValue(data.tender_cost);
    this.tenderDetailsForm.get('status')?.setValue(data.status);
    this.tenderDetailsForm.get('updated_by')?.setValue(this.user_data.user_id);
    
    
    
  }

  onSubmit() {

    if (this.tenderDetailsForm.valid){
      this.tenderDetailsForm.value.work_id =
      this.tenderDetailsForm.value.work_id.toString();
    this.api
      .postCall('/tickets/createTicket', this.tenderDetailsForm.value)
      .subscribe((res) => {
        if (res.status === 'success') {
          this.notification.createNotification(res.status, res.message);
          this.visible = false;
          this.api.getCall('/tickets/getTickets').subscribe((res) => {
            this.tenders = res;
          });
        } else {
          this.notification.createNotification(res.status, res.message);
        }
      });
    }
    else {
      Object.values(this.tenderDetailsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    console.log(this.tenderDetailsForm.value)
  }

  onUpdate() {
    this.tenderDetailsForm.value.work_id =
      this.tenderDetailsForm.value.work_id.toString();
    this.api
      .patchCall(
        `/tickets/updateTicket/${this.tenderDetailsForm.value.ticket_id}`,
        this.tenderDetailsForm.value
      )
      .subscribe((res) => {
        if (res.status === 'success') {
          this.notification.createNotification(res.status, res.message);
          this.visible = false;
          this.api.getCall('/tickets/getTickets').subscribe((res) => {
            this.tenders = res;
          });
        } else {
          this.notification.createNotification(res.status, res.message);
        }
      });
  }
  close(): void {
    this.visible = false;
  }

  getWorknames(id: any) {
    var workNames = '';
    if (Array.isArray(id) === true) id = id;
    else id = id.split(',');
    if (id.length === 1) {
      workNames = this.worksNames[id];
      return workNames;
    } else {
      id.forEach((val: any) => {
        if (workNames == '') workNames = this.worksNames[val];
        else workNames = workNames + ',' + this.worksNames[val];
      });
      return workNames;
    }
  }
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }
  tendorsFormValidators() {
    this.tenderDetailsForm = this.fb.group({
      ticket_id: [null],
      title:[null,[Validators.required,Validators.pattern(GlobalConstants.firstLastNameRegex)]],
      ticket_description: [null, [Validators.required,Validators.pattern(GlobalConstants.addressRegex)]],
      vendor_id: [null, [Validators.required]],
      work_id: [[], [Validators.required]],
      location: [null, [Validators.required,Validators.pattern(GlobalConstants.addressRegex)]],
      tender_cost: [null, [Validators.required]],
      department_id: [null],
      user_id: [null],
      assign_to: [[], [Validators.required]],
      status: [null],
      created_date: [null],
      start_date:[null],
      end_date:[null],
      created_by: [null],
      updated_date: [null],
      updated_by: [null],
    });
  }
}
