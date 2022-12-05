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
    this.tendorsFormValidators();
    this.api.getCall('/tickets/getTickets').subscribe((res) => {
      if(res.length > 0){
        this.tenders = res;
      }else{
        this.tenders = [];
      }

    });

    this.api.getCall('/vendor/getVendors').subscribe((res) => {
      this.vendors = res;
    })

    this.api.getCall('/work/getWorks').subscribe((res) => {
      this.works = res;
    })


    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data)
  }
  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Tender details';
    this.visible = true;
    this.tendorsFormValidators();
    this.tenderDetailsForm.get('ticket_id')?.setValue(data.ticket_id);
    this.tenderDetailsForm.get('vendor_id')?.setValue(data.vendor_id.toString());
    this.tenderDetailsForm.get('ticket_description')?.setValue(data.ticket_description);
    this.tenderDetailsForm.get('work_id')?.setValue(data.work_id.split(",").map(Number));
    this.tenderDetailsForm.get('location')?.setValue(data.location);
    this.tenderDetailsForm.get('tender_cost')?.setValue(data.tender_cost);
    this.tenderDetailsForm.get('status')?.setValue(data.status);
    this.tenderDetailsForm.get('updated_by')?.setValue(this.user_data.user_id);
  }
  open(): void {
    this.submit = true;
    this.drawerTitle = 'Add New Tender';
    this.visible = true;
    this.tendorsFormValidators();
    this.tenderDetailsForm.get('status')?.setValue('open');
  }

  close(): void {
    this.visible = false;
  }

  onSubmit() {
    this.tenderDetailsForm.value.work_id = this.tenderDetailsForm.value.work_id.toString();
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
    this.tenderDetailsForm.value.work_id = this.tenderDetailsForm.value.work_id.toString();
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

  isNotSelected(value: string): boolean {
    return  this.tenderDetailsForm.value.work_id.indexOf(value) === -1;
  }

  tendorsFormValidators(){
    this.tenderDetailsForm = this.fb.group({
      ticket_id: [null, [Validators.required]],
      ticket_description: [null, [Validators.required]],
      vendor_id: [null, [Validators.required]],
      work_id: [[], [Validators.required]],
      location: [null, [Validators.required]],
      tender_cost: [null, [Validators.required]],
      status: [null, [Validators.required]],
      created_date: [null, [Validators.required]],
      created_by: [null, [Validators.required]],
      updated_date: [null, [Validators.required]],
      updated_by: [null, [Validators.required]],
    });
  }
}
