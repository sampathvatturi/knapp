import { TenderDetailsComponent } from './components/tender-details/tender-details.component';

export const TENDER_DETAILS_COMPONENTS = [
    TenderDetailsComponent,
];

export const TENDER_DETAILS_ROUTES = [
    {
        path: 'tender-details',
        component: TenderDetailsComponent,
        data: {
            title: 'Tender Details',
            breadcrumb: 'Tender Details',
        },
    },
];

export * from './components/tender-details/tender-details.component';
