import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';

export const TRANSACTION_DETAILS_COMPONENTS = [
    TransactionDetailsComponent,
];

export const TRANSACTION_DETAILS_ROUTES = [
    {
        path: 'transaction-details',
        component: TransactionDetailsComponent,
        data: {
            title: 'Transaction Details',
            breadcrumb: 'Transaction Details',
        },
    },
];

export * from './components/transaction-details/transaction-details.component';
