import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
})
export class VendorsComponent implements OnInit {
  listOfData: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  vendorForm!: FormGroup;
  constructor(private fb: UntypedFormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.vendorForm = this.fb.group({
      vendor_id: [{ value: '', disabled: true }],
      vendor_name: [''],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: [''],
    });
    this.api.getCall('/dept/getDepts').subscribe((list) => {
      this.listOfData = list;
      console.log(this.listOfData);
    });
  }
  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit';
    this.visible = true;
    this.vendorForm = this.fb.group({
      vendor_id: [
        { value: data.vendor_id, disabled: true },
        [Validators.required],
      ],
      vendor_name: [data.vendor_name, [Validators.required]],
      created_date: [data.created_date, [Validators.required]],
      created_by: [data.created_by, [Validators.required]],
      updated_date: [data.updated_date, [Validators.required]],
      updated_by: [data.updated_by, [Validators.required]],
    });
  }
  open(): void {
    this.submit = true;
    this.drawerTitle = 'New';
    this.visible = true;
    this.vendorForm = this.fb.group({
      vendor_id: [{ value: '', disabled: true }],
      vendor_name: ['', [Validators.required]],
      created_date: [''],
      created_by: [''],
      updated_date: [''],
      updated_by: [''],
    });
  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {
    console.log(this.vendorForm);
    this.api.postCall('/dept', this.vendorForm.value).subscribe();
    this.visible = false;
    this.api.getCall('/dept').subscribe((list) => {
      this.listOfData = list;
    });
  }
  update() {
    this.api.patchCall('/dept', this.vendorForm.value).subscribe();
    this.visible = false;
    this.api.getCall('/dept').subscribe((list) => {
      this.listOfData = list;
    });
  }
}
