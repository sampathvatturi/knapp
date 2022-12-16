import { TransactionsComponent } from './components/transactions/transactions.component';

export const TRANSACTIONS_COMPONENTS = [
    TransactionsComponent,
];

export const TRANSACTIONS_ROUTES = [
    {
        path: 'transactions',
        component: TransactionsComponent,
        data: {
            title: 'Transactions',
            breadcrumb: 'Transactions',
        },
    },
];

export * from './components/transactions/transactions.component';
