import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { WorksService } from 'src/app/services/works.service';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalConstants } from 'src/app/shared/global_constants';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TenderDetailsService } from 'src/app/services/tender-details.service';



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
  files:any[]=[];
  filesDetails = {
    name : '',
    url:''
  }
  baseUrl = environment.apiUrl;
  uploadUrl = this.baseUrl+'/upload/uploadFiles';
  getUploadedFIlesUrl = this.baseUrl+'/upload/getUploadedFiles/';
  isLoading : boolean = true ;
  dataMessage = 'Loading';

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService,
    private works: WorksService,
    private msg: NzMessageService,
    private tendersapi: TenderDetailsService
  ) { }

  ngOnInit(): void {
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.createTendorsFormValidators();
    this.getWork();
    this.getCreateTender();
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
    this.tendersapi.getTenderDetails().subscribe((res)=>{
      this.isLoading = true;
      if(res.status = 204){
        this.dataMessage = res.message
      }
      this.tenders = res;
      this.isLoading = false ;
    })
  }

  create(){
    this.submit = true;
    this.drawerTitle = 'Add Tender';
    this.visible = true;
    this.filesDetails.name='';
    this.filesDetails.url='';
    this.files=[];
    this.createTendorsFormValidators();
    this.createTenderForm.get('status')?.setValue('active');
  }
  edit(type:any,data:any){
    this.submit = false;
    this.drawerTitle = 'Edit Tender Form';
    this.visible = true;
    this.createTendorsFormValidators();
    this.tenderId = data?.id;
    this.createTenderForm.get('description')?.setValue(data.description);
    this.createTenderForm.get('title')?.setValue(data.title);
    this.createTenderForm.get('work_id')?.setValue(data.work_id.split(',').map(Number));
    this.createTenderForm.get('location')?.setValue(data.location);
    this.createTenderForm.get('tender_cost')?.setValue(data.tender_cost);
    this.createTenderForm.get('status')?.setValue(data.status);
    this.createTenderForm.get('start_date')?.setValue(data.start_date);
    this.createTenderForm.get('end_date')?.setValue(data.end_date);
    this.createTenderForm.get('updated_by')?.setValue(this.user_data.user_id);
    if(data.attachments != null && data.attachments !=''){
      var fileNamesArray = data.attachments.split(',');
      if(fileNamesArray.length > 0){
        fileNamesArray.forEach((element:any) => {
          this.filesDetails.name=element;
          this.filesDetails.url=this.getUploadedFIlesUrl+element;
          this.files.push(this.filesDetails);
        });
      }
    }
    this.updateBtnDisable = true;
    if (type === 'view'){
      this.updateBtnDisable = false;
    }
  }

  close(){
    this.visible = false;
  }

  prepareCreateTendorPayload(data: any) {
    var fileNames:any[]=[];
    this.files.forEach(element => {
      fileNames.push(element.name);
    });
    const payload = {
      description: data.description,
      title: data.title,
      work_id: data.work_id,
      location: data.location,
      tender_cost: data.tender_cost,
      status: data.status,
      attachments:fileNames.toString(),
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
      this.tendersapi.createTenderDetail(this.createTenderForm.value).subscribe(res=>{
        if(res.status == 'success')
          this.notification.createNotification('success',res.message);
        else
          this.notification.createNotification('error',res.message);
      })
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
    var fileNames:any[]=[];
    this.files.forEach(element => {
      fileNames.push(element.name);
    });
    const payload = {
      description: data.description,
      title: data.title,
      work_id: data.work_id,
      location: data.location,
      tender_cost: data.tender_cost,
      status: data.status,
      attachments: fileNames.toString(),
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
      this.tendersapi.updateTenderDetail(this.tenderId,this.createTenderForm.value).subscribe(res=>{
        if(res.status == 'success'){
          this.notification.createNotification('success',res.message);
          this.visible = false;
        }else{
          this.notification.createNotification('error',res.message);
        }
      })
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
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
      this.filesDetails.name = info.file.response.fileName;
      this.filesDetails.url = this.getUploadedFIlesUrl+'/'+info.file.response.fileName;
      this.files.push(this.filesDetails);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    } else if(info.file.status !== 'uploading'){
      console.log(info.file, info.fileList);
    }
  }



  handleRemove= (file: NzUploadFile) => new Observable<boolean>((obs) => {
    console.log(obs)
    obs.next(false)
  });

  createTendorsFormValidators() {
    this.createTenderForm = this.fb.group({
      tender_id:[''],
      description: [null, [Validators.required, Validators.pattern(GlobalConstants.addressRegex)]],
      title: [null, [Validators.required, Validators.pattern(GlobalConstants.firstLastNameRegex)]],
      work_id: [[], [Validators.required]],
      location: [null, [Validators.required, Validators.pattern(GlobalConstants.addressRegex)]],
      tender_cost: [null, [Validators.required]],
      status: ['open'],
      attachments: [''],
      start_date: [null,[Validators.required]],
      end_date: [null,[Validators.required]],
      created_by:[this.user_data?.user_id],
      updated_by:[this.user_data?.user_id]
    });
  }
}
