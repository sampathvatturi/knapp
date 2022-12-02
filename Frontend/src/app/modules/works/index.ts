import { WorksComponent } from './components/works/works.component';

export const WORKS_COMPONENTS = [
    WorksComponent,
];

export const WORKS_ROUTES = [
    {
        path: 'works',
        component: WorksComponent,
        data: {
            title: 'Works',
            breadcrumb: 'Works',
        },
    },
];

export * from './components/works/works.component';
