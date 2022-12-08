import { AccountingDetailsComponent } from './components/accounting-details/accounting-details.component';

export const ACCOUNTING_DETAILS_COMPONENTS = [
    AccountingDetailsComponent,
];

export const ACCOUNTING_DETAILS_ROUTES = [
    {
        path: 'accounting-details',
        component: AccountingDetailsComponent,
        data: {
            title: 'Accounting Details',
            breadcrumb: 'Accounting Details',
        },
    },
];

export * from './components/accounting-details/accounting-details.component';
