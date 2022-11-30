import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.css'],
})
export class InventoryItemsComponent implements OnInit {
  listOfData: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  inventoryForm!: FormGroup;
  constructor(private fb: UntypedFormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      item_id: [{ value: '', disabled: true }],
      item_name: [''],
      quantity: [''],
      price: [''],
      tax: [''],
      created_date: [''],
      updated_date: [''],
      updated_by: [''],
      crated_by: [''],
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
    this.inventoryForm = this.fb.group({
      item_id: [{ value: data.item_id, disabled: true }, [Validators.required]],
      item_name: [data.item_name, [Validators.required]],
      quantity: [data.quantity, [Validators.required]],
      price: [data.price, [Validators.required]],
      tax: [data.tax, [Validators.required]],
      created_date: [data.created_date, [Validators.required]],
      updated_date: [data.updated_date, [Validators.required]],
      updated_by: [data.updated_by, [Validators.required]],
      crated_by: [data.crated_by, [Validators.required]],
    });
  }
  open(): void {
    this.submit = true;
    this.drawerTitle = 'New';
    this.visible = true;
    this.inventoryForm = this.fb.group({
      item_id: [{ value: '', disabled: true }],
      item_name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      tax: [''],
      created_date: [''],
      updated_date: [''],
      updated_by: [''],
      crated_by: [''],
    });
  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {
    console.log(this.inventoryForm);
    this.api.postCall('/dept', this.inventoryForm.value).subscribe();
    this.visible = false;
    this.api.getCall('/dept').subscribe((list) => {
      this.listOfData = list;
    });
  }
  update() {
    this.api.patchCall('/dept', this.inventoryForm.value).subscribe();
    this.visible = false;
    this.api.getCall('/dept').subscribe((list) => {
      this.listOfData = list;
    });
  }
}
