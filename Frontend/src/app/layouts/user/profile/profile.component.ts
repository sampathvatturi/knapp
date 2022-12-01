import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  validateForm!: FormGroup;
  user_data: any;
  departments: any;
  dept:any;

  constructor(private fb: UntypedFormBuilder,private api:ApiService) { }
  

  ngOnInit(): void {
    this.api.getCall('/dept/getDepts').subscribe((list) => {
      this.departments = list;
    });
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.validateForm = this.fb.group({
      first_name: [this.user_data.first_name, [Validators.required]],
      last_name: [this.user_data.last_name, [Validators.required]],
      email: [this.user_data.email, [Validators.required,Validators.email]],
      password: [null, [Validators.required]],
      phone_number: [this.user_data.phone_number, [Validators.required]],
      department_id: [this.user_data.department_id, [Validators.required]],
      address: [this.user_data.address, [Validators.required]],
      city: [this.user_data.city, [Validators.required]],
      district: [this.user_data.district, [Validators.required]],
    });

    this.dept = this.departments.department_id
    
    
  }
  

  
  
}

