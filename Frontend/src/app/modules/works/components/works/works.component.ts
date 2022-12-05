import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {
  listOfData: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  workForm!: FormGroup;
  works:any = [];
  user_data:any = [];
  searchText = '';

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification:NotificationService
    ) { }

    ngOnInit(): void {
      this.workForm = this.fb.group({
        vwork_id: [{ value: ''}],
        work_name: [''],
        created_date: [''],
        created_by: [''],
        updated_date: [''],
        updated_by: [''],
      });

      this.api.getCall('/work/getWorks').subscribe((res) =>{
        this.works = res;
      })

      this.user_data = sessionStorage.getItem('user_data');
      this.user_data = JSON.parse(this.user_data);
    }

    edit(data: any) {
      this.submit = false;
      this.drawerTitle = 'Edit';
      this.visible = true;
      this.workForm = this.fb.group({
        work_id: [
          data.work_id,
          [Validators.required],
        ],
        work_name: [data.vendor_name, [Validators.required]],
        updated_by: [this.user_data.user_id],
      });
    }
    open(): void {
      this.submit = true;
      this.drawerTitle = 'New';
      this.visible = true;
      this.workForm = this.fb.group({
        work_id: [''],
        work_name: ['', [Validators.required]],
        created_by: [this.user_data.user_id],
        updated_by: [this.user_data.user_id],
      });
    }

    close(): void {
      this.visible = false;
    }
    onSubmit() {
      this.api.postCall('/work/createWork', this.workForm.value).subscribe((res)=>{
        if(res.status === "success"){
          console.log('jmh')
          this.notification.createNotification(res.status,res.message);
          this.visible = false;
          this.api.getCall('/work/getWorks').subscribe((res) =>{
            this.works = res;
          })
        }else{
          console.log('567')
          this.notification.createNotification(res.status,res.message);
        }
      });
    }
    update() {
      this.api.patchCall('/work/updateWork/'+this.workForm.value.work_id,this.workForm.value).subscribe((res) =>{
        if(res.status === 'success'){
          console.log('123')
          this.notification.createNotification(res.status,res.message);
          this.visible = false;
          this.api.getCall('/work/getWorks').subscribe((res) =>{
          this.works = res;
          })
        }else{
          console.log('dsd')
          this.notification.createNotification(res.status,res.message);
        }
      });
    }
}
