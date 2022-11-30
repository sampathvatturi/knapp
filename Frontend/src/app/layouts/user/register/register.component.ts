import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { Md5hashService } from 'src/app/services/md5hash.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;

  departments : any[] = [];
  constructor(
    private fb: UntypedFormBuilder,
    private router:Router,
    private api:ApiService,
    private notificationService: NotificationService,
    private md5: Md5hashService
    ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      user_name: [null, [Validators.required]],
      password_md5: [null, [Validators.required]],
      // cnfrm_password_md5: [null, [Validators.required,this.confirmationValidator]],
      phone_number: [null, [Validators.required]],
      department_id: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      district: [null, [Validators.required]],
    });

    this.api.getCall('/dept/getDepts').subscribe((list) => {
      this.departments = list;
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.value.cnfrm_password_md5?.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.value.password_md5) {
      return { confirm: true, error: true };
    }
    return {};
  };

  signIn(){
    this.router.navigateByUrl('/login')
  }

  signUp(){
    // console.log()
    // if(this.validateForm.value.password_md5!=this.validateForm.value.cnfrm_password_md5){
    //   console.log('make sure pass are crct')
    // }else{
    // }

      if (this.validateForm.valid) {
        this.validateForm.value.password_md5 = this.md5.logMd5(this.validateForm.value.password_md5);
        this.api.postCall('/user/createUser',this.validateForm.value).subscribe((data=>{
          this.notificationService.createNotification('success', data.msg);
          this.router.navigate(['/login']);
        }))
      } else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
  }

}
