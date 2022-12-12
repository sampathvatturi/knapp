import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { WorksService } from 'src/app/services/works.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalConstants } from 'src/app/shared/global_constants';
import { VendorsService } from 'src/app/services/vendors.service';
import { UserService } from 'src/app/services/user.service';
import { TenderDetailsService } from 'src/app/services/tender-details.service';


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
  departmentUsers: any[] = [];
  tenderId: any;

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService,
    private works: WorksService,
    private msg: NzMessageService,
    private vendor: VendorsService,
    private user: UserService,
    private tenderService: TenderDetailsService
  ) { }

  ngOnInit(): void {
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.tendorsFormValidators();
    this.getWork();
    this.getVendor();
    this.getUser();
    // this.getTendor();
  }

  /*functions for works,vendors,tendors and users*/

  getTendor() {
    this.tenderService.getTenderDetails().subscribe((res) => {
      if (res.length > 0) {
        this.tenders = res;
      } else {
        this.tenders = [];
      }
    })
  }
  getWork() {
    this.works.getWorks().subscribe((res: any) => {
      this.worksDetails = res;
      res.forEach((data: any) => {
        this.worksNames[data.work_id] = data.work_name;
      });
    });
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
    this.drawerTitle = 'Add Tender';
    this.visible = true;
    this.tendorsFormValidators();
    this.tenderDetailsForm.get('status')?.setValue('open');
  }

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Tender details';
    this.visible = true;
    this.tendorsFormValidators();
    this.tenderId = data?.ticket_id;
    let selectedUsers: any[] = [];
    if (data.json_status != '' && data.json_status != null) {
      JSON.parse(data.json_status).forEach((x: any) => {
        selectedUsers.push(x.user_id);
      });
    }
    else selectedUsers = [];
    this.tenderDetailsForm.get('ticket_id')?.setValue(data.ticket_id);
    this.tenderDetailsForm.get('vendor_id')?.setValue(data.vendor_id.toString());
    this.tenderDetailsForm.get('ticket_description')?.setValue(data.ticket_description);
    this.tenderDetailsForm.get('work_id')?.setValue(data.work_id.split(',').map(Number));
    this.tenderDetailsForm.get('assign_to')?.setValue(selectedUsers);
    this.tenderDetailsForm.get('location')?.setValue(data.location);
    this.tenderDetailsForm.get('tender_cost')?.setValue(data.tender_cost);
    this.tenderDetailsForm.get('status')?.setValue(data.status);
    this.tenderDetailsForm.get('updated_by')?.setValue(this.user_data.user_id);
  }

  close(): void {
    this.visible = false;
  }

  prepareTendorPayload(data: any) {
    const payload = {
      ticket_description: data.ticket_description,
      title: data.title,
      vendor_id: data.vendor_id,
      work_id: data.work_id,
      location: data.location,
      tender_cost: data.tender_cost,
      department_id: data.department_id,
      user_id: data.user_id,
      assign_to: data.assign_to,
      status: data.status,
      start_date: data.start_date,
      end_date: data.end_date,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
  }

  onCreateSubmit() {
    if (this.tenderDetailsForm.valid) {
      this.tenderDetailsForm.value.work_id = this.tenderDetailsForm.value.work_id.toString();
      this.tenderService.createTenderDetail(this.prepareTendorPayload(this.tenderDetailsForm.value)).subscribe((res) => {
        this.visible = false;
        this.getTendor();
        this.notification.createNotification("success", res?.message);
      })
    }
    else {
      Object.values(this.tenderDetailsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  prepareUpdatePayload(data: any) {
    const payload = {
      ticket_description: data.ticket_description,
      title: data.title,
      vendor_id: data.vendor_id,
      work_id: data.work_id,
      location: data.location,
      tender_cost: data.tender_cost,
      department_id: data.department_id,
      user_id: data.user_id,
      assign_to: data.assign_to,
      status: data.status,
      start_date: data.start_date,
      end_date: data.end_date,
      updated_by: this.user_data?.user_id
    }
  }
  onUpdateSubmit() {
    if (this.tenderDetailsForm.valid) {
      this.tenderDetailsForm.value.work_id = this.tenderDetailsForm.value.work_id.toString();
      this.tenderService.updateTenderDetail(this.tenderId, this.prepareUpdatePayload(this.tenderDetailsForm.value)).subscribe((res) => {
        this.notification.createNotification("success", res?.message);
        this.visible = false;
        this.getTendor();
      })
    }
    else {
      console.log('invalid')
      Object.values(this.tenderDetailsForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
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
      ticket_description: [null, [Validators.required, Validators.pattern(GlobalConstants.addressRegex)]],
      title: [null, [Validators.required, Validators.pattern(GlobalConstants.firstLastNameRegex)]],
      vendor_id: [null, [Validators.required]],
      work_id: [[], [Validators.required]],
      location: [null, [Validators.required, Validators.pattern(GlobalConstants.addressRegex)]],
      tender_cost: [null, [Validators.required]],
      department_id: [null],
      user_id: [null],
      assign_to: [[], [Validators.required]],
      status: [null],
      created_date: [null],
      start_date: [null],
      end_date: [null],
    });
  }
}
