import { ApprovalsComponent } from './components/approvals/approvals.component';

export const APPROVALS_COMPONENTS = [
    ApprovalsComponent,
];

export const APPROVALS_ROUTES = [
    {
        path: 'approvals',
        component: ApprovalsComponent,
        data: {
            title: 'Approvals',
            breadcrumb: 'Approvals',
        },
    },
];

export * from './components/approvals/approvals.component';
