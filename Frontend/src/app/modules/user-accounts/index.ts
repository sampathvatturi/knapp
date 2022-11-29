import { UserAccountsComponent } from './components/user-accounts/user-accounts.component';

export const USER_ACCOUNTS_COMPONENTS = [
    UserAccountsComponent,
];

export const USER_ACCOUNTS_ROUTES = [
    {
        path: 'user-accounts',
        component: UserAccountsComponent,
        data: {
            title: 'User Accounts',
            breadcrumb: 'User Accounts',
        },
    },
];

export * from './components/user-accounts/user-accounts.component';
