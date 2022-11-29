import { VendorsComponent } from './components/vendors/vendors.component';

export const VENDORS_COMPONENTS = [
    VendorsComponent,
];

export const VENDORS_ROUTES = [
    {
        path: 'vendors',
        component: VendorsComponent,
        data: {
            title: 'Vendors',
            breadcrumb: 'Vendors',
        },
    },
];

export * from './components/vendors/vendors.component';
