import { DashboardComponent } from './components/dashboard/dashboard.component';

export const DASHBOARD_COMPONENTS = [
    DashboardComponent,
];

export const DASHBOARD_ROUTES = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            title: 'Dashboard',
            breadcrumb: 'Dashboard',
        },
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            title: 'Dashboard',
            breadcrumb: 'Dashboard',
        },
    },
];

export * from './components/dashboard/dashboard.component';
