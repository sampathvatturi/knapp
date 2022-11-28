import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  validateForm!: FormGroup;
  constructor(private fb: UntypedFormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required,Validators.email]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      remember: [true]
    });

  }
  signIn(){
    this.route.navigateByUrl('/login');
  }

}
