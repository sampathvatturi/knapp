import { InventoryItemsComponent } from './components/inventory-items/inventory-items.component';

export const INVENTORY_ITEMS_COMPONENTS = [
    InventoryItemsComponent,
];

export const INVENTORY_ITEMS_ROUTES = [
    {
        path: 'inventory-items',
        component: InventoryItemsComponent,
        data: {
            title: 'Inventory Items',
            breadcrumb: 'Inventory Items',
        },
    },
];

export * from './components/inventory-items/inventory-items.component';
