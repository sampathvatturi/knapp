import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { InventoryItemsService } from './../../../../services/inventory-items.service';
import { GlobalConstants } from 'src/app/shared/global_constants';

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
    if (this.inventoryForm.valid){
      this.api
      .postCall('/inventory/createInventory', this.inventoryForm.value)
      .subscribe();
    this.visible = false;
    this.inventoryService
      .getInventoryItems()
      .subscribe((res) => (this.inventory_info = res));
    }

    else {
      
      Object.values(this.inventoryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    
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
    if (this.inventoryForm.valid){
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

    else {
      
      Object.values(this.inventoryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  close(): void {
    this.visible = false;
  }

  inventoryFormValidators() {
    this.inventoryForm = this.fb.group({
      item_id: [''],
      item_name: ['', [Validators.required,Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(3),Validators.maxLength(50)]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      tax: ['', [Validators.required]],
      created_date: [''],
      crated_by: [''],
      updated_date: [''],
      updated_by: [''],
    });
  }
}
