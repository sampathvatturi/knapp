import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { Md5hashService } from 'src/app/services/md5hash.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global_constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  responseMessage!: string;

  constructor(
    private fb: UntypedFormBuilder,
    private route: Router,
    private userService: UserService,
    private notificationService: NotificationService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private md5: Md5hashService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  signup() {
    this.route.navigateByUrl('/signup');
  }

  forgot() {
    this.route.navigateByUrl('/forgotpwd');
  }
  
  onSubmit(): void {
    this.ngxUiLoaderService.start();
    const formData = this.validateForm.value;
    const obj = {
      email: formData.email,
      password: this.md5.logMd5(formData.password)
    };
    this.userService.login(obj).subscribe((response: any) => {
      console.log("response in Login: ", response);
      this.ngxUiLoaderService.stop();
      this.responseMessage = "You are logged-in";
      this.notificationService.createNotification('success', this.responseMessage);
      localStorage.setItem('token', response?.token);
      localStorage.setItem('role', 'admin');
      sessionStorage.setItem('user_data',JSON.stringify(response?.user_data));
      this.route.navigate(['/app']);
    }, (error) => {
      this.ngxUiLoaderService.stop();
      if (error?.error?.message) {
        this.responseMessage = error?.error?.message;
      } else if (error?.message) {
        this.responseMessage = error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.notificationService.createNotification('error', this.responseMessage);
    });
  }
}
