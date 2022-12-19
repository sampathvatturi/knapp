import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { TenderDetailsService } from 'src/app/services/tender-details.service';
import { VendorsService } from 'src/app/services/vendors.service';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  styleUrls: ['./survey-report.component.css']
})
export class SurveyReportComponent implements OnInit {
  works_info: any = [];
  searchText = '';
  drawerTitle: string = '';
  surveyForm!: FormGroup;
  visible = false;
  submit = true;
  updateBtnDisable: boolean = false;
  tenders:any = [];
  vendor_array: any = [];
  v_name: any = {};
  isLoading = true;

  constructor(private fb: UntypedFormBuilder,
    private notification: NotificationService,
    private tenderService:TenderDetailsService,
    private works:WorksService,
    private vendors:VendorsService
    ) { }

  ngOnInit(): void {
    this.getTenders();
    this.getWorks();
    this.getVendors();
  }
  getTenders() {
    this.tenderService.getTenderDetails().subscribe((res) => {
      if (res.length > 0) {
        this.tenders = res;
    this.isLoading = false;

      } else {
        this.tenders = [];
      }
    })
  }
  getVendors(){
    this.vendors.getVendors().subscribe((res) => {
      this.vendor_array = res;
      for (let x of this.vendor_array) {
        this.v_name[x.vendor_id] = x.vendor_name;
      }
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
  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Survey Report';
    this.visible = true;
    this.surveyFormValidators();
  }
  edit(type: any, data: any) {
    console.log(data);
    this.submit = false;
    this.drawerTitle = 'Edit Survey Report';
    this.visible = true;
    this.surveyFormValidators();
    this.surveyForm.get('status')?.setValue(data.status.toString());
    if (type === 'view') {
      this.updateBtnDisable = false;
    }
  }
  close(): void {
    this.visible = false;
  }
  onCreateSubmit() {
    if (this.surveyForm.valid) {

    } else {
      Object.values(this.surveyForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onUpdateSubmit() {
    if (this.surveyForm.valid) {
      //service
    } else {
      Object.values(this.surveyForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  surveyFormValidators() {
    this.surveyForm = this.fb.group({
      status: ['', [Validators.required]],
    });
  }
}
