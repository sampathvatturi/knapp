import { AccountsComponent } from './components/accounts/accounts.component';

export const ACCOUNTS_COMPONENTS = [
    AccountsComponent,
];

export const ACCOUNTS_ROUTES = [
    {
        path: 'accounts',
        component: AccountsComponent,
        data: {
            title: 'Accounts',
            breadcrumb: 'Accounts',
        },
    },
];

export * from './components/accounts/accounts.component';
