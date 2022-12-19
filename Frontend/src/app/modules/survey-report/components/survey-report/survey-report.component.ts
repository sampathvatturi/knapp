import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/auth/notification.service';

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

  constructor(private fb: UntypedFormBuilder,
    private notification: NotificationService,) { }

  ngOnInit(): void {
  }
  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Survey Report';
    this.visible = true;
    this.surveyFormValidators();
  }
  edit(type: any, data: any) {

    this.submit = false;
    this.drawerTitle = 'Edit Survey Report';
    this.visible = true;
    this.surveyFormValidators();
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
