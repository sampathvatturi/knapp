import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.css']
})
export class TenderDetailsComponent implements OnInit {

  listOfData: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  tenderDetailsForm!: FormGroup;
  tender_info:any = [];
  departments:any = [];
  vendor_array:any = [];
  user_data:any = [];

  constructor(
    private departmentservice: DepartmentService,
    private fb: UntypedFormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.tenderDetailsForm = this.fb.group({
      ticket_id: [''],
      ticket_description: [''],
      vendor_id: [''],
      location: [''],
      status: [''],
      department_id: [''],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: ['']
    });

    this.api.getCall('/dept/getDepts').subscribe((list) => {
      this.departments = list;
    });

    this.api.getCall('').subscribe((items) =>{
      this.tender_info = items;
    })

    this.api.getCall('/vendor/getVendors').subscribe((items) => {
      this.vendor_array = items;
    })

    this.user_data = sessionStorage.getItem(this.user_data);
    this.user_data = JSON.parse(this.user_data)
  }
  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit';
    this.visible = true;
    this.tenderDetailsForm = this.fb.group({
      ticket_id: [data.ticket_id, [Validators.required]],
      ticket_description: [data.ticket_description, [Validators.required]],
      vendor_id: [data.vendor_id, [Validators.required]],
      location: [data.location, [Validators.required]],
      status: [data.status, [Validators.required]],
      department_id: [data.department_id, [Validators.required]],
      
      updated_by: [this.user_data.user_id],
    });
  }
  open(): void {
    this.submit = true;
    this.drawerTitle = 'New';
    this.visible = true;
    this.tenderDetailsForm = this.fb.group({
      ticket_id: [''],
      ticket_description: ['', [Validators.required]],
      vendor_id: ['', [Validators.required]],
      location: ['', [Validators.required]],
      status: ['open', [Validators.required]],
      department_id: ['', [Validators.required]],
      
      created_by: [this.user_data.user_id],
      
      updated_by: [this.user_data.user_id],
    });
  }

  close(): void {
    this.visible = false;
  }

  onSubmit() {
    console.log(this.tenderDetailsForm);
    this.api.postCall('//', this.tenderDetailsForm.value).subscribe();
    this.visible = false;

    this.api.getCall('//').subscribe((items) =>{
      this.tender_info = items;
    })
    
  }
  update() {
    this.api.patchCall(`//${this.tenderDetailsForm.value.ticket_id}`, this.tenderDetailsForm.value).subscribe();
    this.visible = false;

    this.api.getCall('//').subscribe((items) =>{
      this.tender_info = items;
    })
    
  }
}
