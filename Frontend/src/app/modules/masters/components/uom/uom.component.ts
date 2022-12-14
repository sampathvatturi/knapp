import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { UomService } from 'src/app/services/uom.service';
import { GlobalConstants } from 'src/app/shared/global_constants';



@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.css']
})
export class UomComponent implements OnInit {
  visible = false;
  submit = true;
  drawerTitle: string = '';
  uomForm!: FormGroup;
  uom_info: any = [];
  user_data: any = [];
  searchText = '';
  uomId: any;
  

  constructor(private fb: UntypedFormBuilder, private notification: NotificationService,private uomService:UomService) { }

  ngOnInit(): void {
    this.uomFormValidators();    
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getUom();
  }
  getUom(): void {
    this.uomService.getUoms().subscribe((res) => {
      this.uom_info = res
    });
  }
  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Uom';
    this.visible = true;
    this.uomFormValidators();
  }

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Uom Details';
    this.visible = true;
    this.uomId = data?.uom_id;
    this.uomFormValidators();
    this.uomForm.get('uom_code')?.setValue(data?.uom_code);
    this.uomForm.get('uom_name')?.setValue(data?.uom_name);
  }

  close(): void {
    this.visible = false;
  }

  prepareUomPayload(data: any) {
    const payload = {
      uom_code:data.uom_code,
      uom_name:data.uom_name,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.uomForm.valid){
      this.uomService.createUom(this.prepareUomPayload(this.uomForm.value)).subscribe((res) => {
        this.visible = false;
        this.getUom();
        this.notification.createNotification("success", res?.message);
      });      
    } else {
      console.log('invalid');
      Object.values(this.uomForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUpdatePayload(data: any) {
    const payload = {     
      uom_code:data.uom_code,
      uom_name:data.uom_name,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onUpdateSubmit() {
    if (this.uomForm.valid) {
      this.uomService.updateUom(this.uomId, this.prepareUpdatePayload(this.uomForm.value)).subscribe((res) => {
        this.notification.createNotification(res.status,res.message);        
        this.visible = false;
        this.getUom();
      });
    } else {
        console.log('invalid')
        Object.values(this.uomForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
  }

  uomFormValidators(){
    this.uomForm = this.fb.group({
      uom_name: ['',[Validators.required,Validators.pattern(GlobalConstants.firstLastNameRegex),Validators.minLength(3),Validators.maxLength(50)]],
      uom_code: ['',[Validators.required,Validators.pattern(GlobalConstants.firstLastNameRegex),Validators.minLength(2),Validators.maxLength(50)]],
    });
  }
}
