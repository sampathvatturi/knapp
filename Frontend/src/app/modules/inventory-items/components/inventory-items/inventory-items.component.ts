import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { InventoryItemsService } from './../../../../services/inventory-items.service';

@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.css'],
})
export class InventoryItemsComponent implements OnInit {
  visible = false;
  submit = true;
  drawerTitle: string = '';
  inventoryForm!: FormGroup;
  inventory_info: any = [];
  user_data: any = [];
  searchText = '';

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private inventoryService: InventoryItemsService
  ) {}

  ngOnInit(): void {
    this.inventoryFormValidators();
    this.inventoryService
      .getInventoryItems()
      .subscribe((res) => (this.inventory_info = res));
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add New Inventory Item';
    this.visible = true;
    this.inventoryFormValidators();
    this.inventoryForm.get('crated_by')?.setValue(this.user_data.user_id);
    this.inventoryForm.get('updated_by')?.setValue(this.user_data.user_id);
  }

  onSubmit() {
    this.api
      .postCall('/inventory/createInventory', this.inventoryForm.value)
      .subscribe();
    this.visible = false;
    this.inventoryService
      .getInventoryItems()
      .subscribe((res) => (this.inventory_info = res));
  }

  edit(data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Invetory Items Details';
    this.visible = true;
    this.inventoryFormValidators();
    this.inventoryForm.get('item_id')?.setValue(data.item_id);
    this.inventoryForm.get('item_name')?.setValue(data.item_name);
    this.inventoryForm.get('quantity')?.setValue(data.quantity);
    this.inventoryForm.get('price')?.setValue(data.price);
    this.inventoryForm.get('tax')?.setValue(data.tax);
    this.inventoryForm.get('updated_by')?.setValue(data.updated_by);
  }

  onUpdate() {
    console.log(this.inventoryForm.value);
    this.api
      .patchCall(
        `/inventory/updateInventory/${this.inventoryForm.value.item_id}`,
        this.inventoryForm.value
      )
      .subscribe();
    this.inventoryService
      .getInventoryItems()
      .subscribe((res) => (this.inventory_info = res));
    this.visible = false;
  }

  close(): void {
    this.visible = false;
  }

  inventoryFormValidators() {
    this.inventoryForm = this.fb.group({
      item_id: ['', [Validators.required]],
      item_name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      tax: ['', [Validators.required]],
      created_date: ['', [Validators.required]],
      crated_by: ['', [Validators.required]],
      updated_date: ['', [Validators.required]],
      updated_by: ['', [Validators.required]],
    });
  }
}
