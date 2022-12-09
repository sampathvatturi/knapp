import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
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
  works:any = [];
  user_data:any = [];
  searchText = '';
  errTip = '';

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification:NotificationService,private work:WorksService
    ) { }

    ngOnInit(): void {
      
      this.worksFormValidators();

      this.work.getWorks().subscribe((res) => this.works = res)


      this.user_data = sessionStorage.getItem('user_data');
      this.user_data = JSON.parse(this.user_data);
    }

    edit(data: any) {
      this.submit = false;
      this.drawerTitle = 'Edit';
      this.visible = true;
      this.worksFormValidators();
      this.workForm.get('work_id')?.setValue(data.work_id);
      this.workForm.get('work_name')?.setValue(data.work_name);
      this.workForm.get('updated_by')?.setValue(this.user_data.user_id);
      
    }
    create(): void {
      this.submit = true;
      this.drawerTitle = 'Add Work';
      this.visible = true;

      this.worksFormValidators();
      this.workForm.get('created_by')?.setValue(this.user_data.user_id);
      this.workForm.get('updated_by')?.setValue(this.user_data.user_id);
      
    }

    close(): void {
      this.visible = false;
    }
    onSubmit() {
      console.log('submit')

      if (this.workForm.valid){
        console.log('valid')
        this.api.postCall('/work/createWork', this.workForm.value).subscribe((res)=>{
          if(res.status === "success"){
            console.log('jmh')
            this.notification.createNotification(res.status,res.message);
            this.visible = false;
            this.work.getWorks().subscribe((res) => this.works = res)
          }else{
            console.log('567')
            this.notification.createNotification(res.status,res.message);
          }
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
    onUpdate() {
      if (this.workForm.valid){
        this.api.patchCall('/work/updateWork/'+this.workForm.value.work_id,this.workForm.value).subscribe((res) =>{
          if(res.status === 'success'){
            this.notification.createNotification(res.status,res.message);
            this.visible = false;
            this.work.getWorks().subscribe((res) => this.works = res)
          }
          else{  
            this.notification.createNotification(res.status,res.message);
          }
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

    worksFormValidators(){
      this.workForm = this.fb.group({
        work_id: [''],
        work_name: ['',[Validators.required,Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(3),Validators.maxLength(50)]],
        created_date: [''],
        created_by: [''],
        updated_date: [''],
        updated_by: [''],
      });
    }
}
