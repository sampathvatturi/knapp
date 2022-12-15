import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { WorksService } from 'src/app/services/works.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalConstants } from 'src/app/shared/global_constants';



@Component({
  selector: 'app-create-tender',
  templateUrl: './create-tender.component.html',
  styleUrls: ['./create-tender.component.css']
})
export class CreateTenderComponent implements OnInit {

  visible = false;
  submit = true;
  drawerTitle: string = '';
  createTenderForm!: FormGroup;
  tenders: any = [];
  user_data: any = [];
  searchText = '';
  worksDetails: any[] = [];
  worksNames: any[] = [];
  tenderId: any;
  updateBtnDisable:boolean = true;

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService,
    private works: WorksService,
    private msg: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.createTendorsFormValidators();
    this.getWork();
  }

  getWork() {
    this.works.getWorks().subscribe((res: any) => {
      this.worksDetails = res;
      res.forEach((data: any) => {
        this.worksNames[data.work_id] = data.work_name;
      });
    });
  }

  getCreateTender(){
    //service
  }

  create(){
    this.submit = true;
    this.drawerTitle = 'Add Tender';
    this.visible = true;
    this.createTendorsFormValidators();
    this.createTenderForm.get('status')?.setValue('active');
  }
  edit(type:any,data:any){
    this.submit = false;
    this.drawerTitle = 'Edit Tender Form';
    this.visible = true;
    this.createTendorsFormValidators();
    this.tenderId = data?.ticket_id;
    this.createTenderForm.get('ticket_description')?.setValue(data.ticket_description);
    this.createTenderForm.get('title')?.setValue(data.title);
    this.createTenderForm.get('work_id')?.setValue(data.work_id.split(',').map(Number));
    this.createTenderForm.get('location')?.setValue(data.location);
    this.createTenderForm.get('tender_cost')?.setValue(data.tender_cost);
    this.createTenderForm.get('status')?.setValue(data.status);
    this.createTenderForm.get('updated_by')?.setValue(this.user_data.user_id);
    this.updateBtnDisable = true;
    if (type === 'view'){
      this.updateBtnDisable = false;
    }
  }

  close(){
    this.visible = false;
  }

  prepareCreateTendorPayload(data: any) {
    const payload = {
      ticket_description: data.ticket_description,
      title: data.title,
      work_id: data.work_id,
      location: data.location,
      tender_cost: data.tender_cost,
      status: data.status,
      start_date: data.start_date,
      end_date: data.end_date,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }
  onCreateSubmit(){
    if (this.createTenderForm.valid) {
      this.createTenderForm.value.work_id = this.createTenderForm.value.work_id.toString();
      //service
    }
    else {
      Object.values(this.createTenderForm.controls).forEach((control) => {
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
  prepareCreateUpdatePayload(data: any) {
    const payload = {
      ticket_description: data.ticket_description,
      title: data.title,
      work_id: data.work_id,
      location: data.location,
      tender_cost: data.tender_cost,
      status: data.status,
      start_date: data.start_date,
      end_date: data.end_date,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }
  onUpdateSubmit(){
    if (this.createTenderForm.valid) {
      this.createTenderForm.value.work_id = this.createTenderForm.value.work_id.toString();
      //service
    }
    else {
      console.log('invalid')
      Object.values(this.createTenderForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
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

  createTendorsFormValidators() {
    this.createTenderForm = this.fb.group({
      ticket_description: [null, [Validators.required, Validators.pattern(GlobalConstants.addressRegex)]],
      title: [null, [Validators.required, Validators.pattern(GlobalConstants.firstLastNameRegex)]],
      work_id: [[], [Validators.required]],
      location: [null, [Validators.required, Validators.pattern(GlobalConstants.addressRegex)]],
      tender_cost: [null, [Validators.required]],
      status: [null],
      start_date: [null,[Validators.required]],
      end_date: [null,[Validators.required]],
    });
  }
}
