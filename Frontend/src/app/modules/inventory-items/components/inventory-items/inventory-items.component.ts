import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { InventoryItemsService } from './../../../../services/inventory-items.service';
import { GlobalConstants } from 'src/app/shared/global_constants';
import { NotificationService } from 'src/app/services/auth/notification.service';
import { UomService } from 'src/app/services/uom.service';

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
  updateId: any;
  uomData: any [] = [];
  updateBtnDisable:boolean = true;

  
  constructor(
    private fb: UntypedFormBuilder,
    private inventoryService: InventoryItemsService,
    private notificationService: NotificationService,
    private uomService: UomService,

  ) {}

  ngOnInit(): void {
    this.inventoryFormValidators();    
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getInventoryItems();
    this.getUoms();
  }

  getInventoryItems(): void {
    this.inventoryService.getInventoryItems().subscribe((res) => {
       this.inventory_info = res;
    });
  }

  getUoms(): void {
    this.uomService.getUoms().subscribe((res) => {
      this.uomData = res;
   });
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Inventory Item';
    this.visible = true;
    this.inventoryFormValidators();
  }

  prepareCreatePayload(data: any) {
    const payload = {
      item_name: data.item_name,
      uom_id: data.uom_id,
      price: data.price,
      tax: data.tax,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onSubmit() {
    if (this.inventoryForm.valid){      
      this.inventoryService.createInventoryItem(this.prepareCreatePayload(this.inventoryForm.value)).subscribe((res) => {
        this.visible = false;
        this.getInventoryItems();
        this.notificationService.createNotification('success', res?.message);
      });
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

  edit(type:any,data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Invetory Details';
    this.visible = true;
    this.updateId = data?.item_id;
    this.inventoryFormValidators();
    this.inventoryForm.get('item_id')?.setValue(data.item_id);
    this.inventoryForm.get('item_name')?.setValue(data.item_name);
    this.inventoryForm.get('uom_id')?.setValue(data.uom_id);
    this.inventoryForm.get('price')?.setValue(data.price);
    this.inventoryForm.get('tax')?.setValue(data.tax);
    this.updateBtnDisable = true;
    if (type === 'view'){
      this.updateBtnDisable = false;
    }
  }

  prepareUpdatePayload(data: any) {
    const payload = {
      item_name: data.item_name,
      uom_id: data.uom_id,
      price: data.price,
      tax: data.tax,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onUpdate() {
    if (this.inventoryForm.valid){
      this.inventoryService.updateInventoryItem(this.updateId,this.prepareUpdatePayload(this.inventoryForm.value)).subscribe(
        (res) => {
          this.visible = false;
          this.getInventoryItems();
          this.notificationService.createNotification('success', res?.message);
        }
      )
    } else {      
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
      uom_id: ['', [Validators.required]],
      price: ['', [Validators.required]],
      tax: ['', [Validators.required]]
    });
  }
}
