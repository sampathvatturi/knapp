import { FundsComponent } from './components/funds/funds.component';

export const FUNDS_COMPONENTS = [
    FundsComponent,
];

export const FUNDS_ROUTES = [
    {
        path: 'funds',
        component: FundsComponent,
        data: {
            title: 'Funds',
            breadcrumb: 'Funds',
        },
    },
];

export * from './components/funds/funds.component';
