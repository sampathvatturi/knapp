import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/auth/notification.service';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.css']
})
export class TenderDetailsComponent implements OnInit {


  visible = false;
  submit = true;
  drawerTitle: string = '';
  tenderDetailsForm!: FormGroup;
  tenders:any = [];
  vendors:any = [];
  user_data:any = [];
  searchText = '';
  works:any []= [];

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.tenderDetailsForm = this.fb.group({
      ticket_id: [''],
      ticket_description: [''],
      vendor_id: [''],
      work_id: [''],
      location: [''],
      status: [''],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: ['']
    });

    this.api.getCall('/tickets/getTickets').subscribe((res) => {
      this.tenders = res;
    });

    this.api.getCall('/vendor/getVendors').subscribe((res) => {
      this.vendors = res;
    })

    this.api.getCall('/work/getWorks').subscribe((res) => {
      console.log(res)
      this.works = res;
    })


    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data)
  }
  edit(data: any) {
    var new_work = data.work_id.split(",");
    this.submit = false;
    this.drawerTitle = 'Edit';
    this.visible = true;
    this.tenderDetailsForm = this.fb.group({
      ticket_id: [data.ticket_id, [Validators.required]],
      ticket_description: [data.ticket_description, [Validators.required]],
      vendor_id: [data.vendor_id, [Validators.required]],
      work_id: [new_work, [Validators.required]],
      location: [data.location, [Validators.required]],
      status: [data.status, [Validators.required]],
      updated_by: [this.user_data.user_id],
    });
  }
  open(): void {
    this.submit = true;
    this.drawerTitle = 'Add New Tender';
    this.visible = true;
    this.tenderDetailsForm = this.fb.group({
      ticket_id: [''],
      ticket_description: ['', [Validators.required]],
      vendor_id: ['', [Validators.required]],
      work_id: ['', [Validators.required]],
      location: ['', [Validators.required]],
      status: ['open', [Validators.required]],
      created_by: [this.user_data.user_id],
      updated_by: [this.user_data.user_id],
    });
  }

  close(): void {
    this.visible = false;
  }

  onSubmit() {
    console.log(this.tenderDetailsForm.value.work_id)
    this.api.postCall('/tickets/createTicket', this.tenderDetailsForm.value).subscribe((res)=>{
      if(res.status === 'success'){
        this.notification.createNotification(res.status,res.message);
        this.visible = false;
        this.api.getCall('/tickets/getTickets').subscribe((res) =>{
          this.tenders = res;
        })
      }else{
        this.notification.createNotification(res.status,res.message);
      }
    });
  }

  update() {
    this.api.patchCall(`/tickets/updateTicket/${this.tenderDetailsForm.value.ticket_id}`, this.tenderDetailsForm.value).subscribe((res)=>{
      if(res.status === 'success'){
        this.notification.createNotification(res.status,res.message);
        this.visible = false;
        this.api.getCall('/tickets/getTickets').subscribe((res) =>{
          this.tenders = res;
        })
      }else{
        this.notification.createNotification(res.status,res.message);
      }
    })
  }
}
