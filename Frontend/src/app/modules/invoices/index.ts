import { InvoicesComponent } from './components/invoices/invoices.component';

export const INVOICES_COMPONENTS = [
    InvoicesComponent,
];

export const INVOICES_ROUTES = [
    {
        path: 'invoices',
        component: InvoicesComponent,
        data: {
            title: 'Invoices',
            breadcrumb: 'Invoices',
        },
    },
];

export * from './components/invoices/invoices.component';
