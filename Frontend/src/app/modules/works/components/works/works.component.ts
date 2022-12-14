import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { WorksService } from 'src/app/services/works.service';
import { GlobalConstants } from 'src/app/shared/global_constants';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {
  visible = false;
  submit = true;
  drawerTitle: string = '';
  workForm!: FormGroup;
  works_info:any = [];
  user_data:any = [];
  searchText = '';
  errTip = '';
  workId:any;
  updateBtnDisable:boolean = true;

  constructor(
    private fb: UntypedFormBuilder,
    private notification:NotificationService,
    private workService:WorksService
    ) { }

    ngOnInit(): void {
      this.worksFormValidators();
      this.user_data = sessionStorage.getItem('user_data');
      this.user_data = JSON.parse(this.user_data);
      this.getWorks();
    }

    getWorks():void{
      this.workService.getWorks().subscribe((res) =>{
        this.works_info = res
      });
    }

    create(): void {
      this.submit = true;
      this.drawerTitle = 'Add Work';
      this.visible = true;
      this.worksFormValidators();
    }

    edit(type:any,data: any) {
      this.submit = false;
      this.drawerTitle = 'Edit Work Details';
      this.visible = true;
      this.workId = data?.work_id;
      this.worksFormValidators();
      this.workForm.get('work_name')?.setValue(data.work_name);
      this.updateBtnDisable = true;
      if (type === 'view'){
        this.updateBtnDisable = false;
      }
    }

    close(): void {
      this.visible = false;
    }

    prepareWorksPayload(data:any){
      const payload = {
        work_name:data.work_name,
        created_by:this.user_data.user_id,
        updated_by:this.user_data?.user_id
      }
      return payload;
    }
    
    onCreateSubmit() {
      if (this.workForm.valid){
        this.workService.createWorks(this.prepareWorksPayload(this.workForm.value)).subscribe((res)=>{
            this.visible = false;
            this.getWorks();
            this.notification.createNotification("success", res?.message);
        });
      }
      else {
        console.log('invalid')
        Object.values(this.workForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }

    prepareUpdatePayload(data:any){
      const payload = {
        work_name:data.work_name,
        updated_by:this.user_data?.user_id
      }
      return payload;
    }

    onUpdateSubmit() {
      if (this.workForm.valid) {
        this.workService.updateWorks(this.workId, this.prepareUpdatePayload(this.workForm.value)).subscribe((res) => {
          this.notification.createNotification(res.status,res.message);        
          this.visible = false;
          this.getWorks();
        });
      } else {
          console.log('invalid')
          Object.values(this.workForm.controls).forEach(control => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          });
        }
    }

    worksFormValidators(){
      this.workForm = this.fb.group({
        work_name: ['',[Validators.required,Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(3),Validators.maxLength(50)]],
      });
    }
}
