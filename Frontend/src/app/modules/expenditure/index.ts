import { ExpenditureComponent } from './components/expenditure/expenditure.component';

export const EXPENDITURE_COMPONENTS = [
    ExpenditureComponent,
];

export const EXPENDITURE_ROUTES = [
    {
        path: 'expenditure',
        component: ExpenditureComponent,
        data: {
            title: 'Expenditure',
            breadcrumb: 'Expenditure',
        },
    },
];

export * from './components/expenditure/expenditure.component';
