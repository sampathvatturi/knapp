import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;


  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      department: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      district: [null, [Validators.required]],
    });
  }
  signIn(){
    
  }

}
