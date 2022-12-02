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
  inventory_info: any = [];
  user_data: any = [];
  searchText = '';

  constructor(private fb: UntypedFormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      item_id: [{ value: '', disabled: true }],
      item_name: [''],
      quantity: [''],
      price: [''],
      tax: [''],
      created_date: [''],
      crated_by: [''],
      updated_date: [''],
      updated_by: [''],
    });
    this.api.getCall('/dept/getDepts').subscribe((res) => {
      this.listOfData = res;
      console.log(this.listOfData);
    });

    this.api.getCall('/inventory/getInventory').subscribe((res) => {
      this.inventory_info = res;
      console.log(this.inventory_info);
    });

    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
  }
  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit';
    this.visible = true;
    this.inventoryForm = this.fb.group({
      item_id: [ data.item_id,
        [Validators.required],
      ],
      item_name: [data.item_name, [Validators.required]],
      quantity: [data.quantity, [Validators.required]],
      price: [data.price, [Validators.required]],
      tax: [data.tax, [Validators.required]],

      updated_by: [this.user_data.user_id],
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
      crated_by: [this.user_data.user_id],
      updated_by: [this.user_data.user_id],
    });
  }

  close(): void {
    this.visible = false;
  }
  onSubmit() {
    this.api
      .postCall('/inventory/createInventory', this.inventoryForm.value)
      .subscribe();
    this.visible = false;

    this.api.getCall('/inventory/getInventory').subscribe((res) => {
      this.inventory_info = res;
    });
  }

  update() {
    console.log(this.inventoryForm.value)
    this.api
      .patchCall(
        `/inventory/updateInventory/${this.inventoryForm.value.item_id}`,
        this.inventoryForm.value
      )
      .subscribe();
    this.visible = false;

    this.api.getCall('/inventory/getInventory').subscribe((res) => {
      this.inventory_info = res;
    });
  }
}
