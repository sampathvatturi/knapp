import { TenderDetailsComponent } from './components/tender-details/tender-details.component';
import { CreateTenderComponent } from './components/create-tender/create-tender.component';

export const TENDER_DETAILS_COMPONENTS = [
    TenderDetailsComponent,
];
export const CREATE_TENDER_COMPONENTS = [
    CreateTenderComponent,
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
export const CREATE_TENDER_ROUTES = [
    {
        path: 'create-tender',
        component: CreateTenderComponent,
        data: {
            title: 'Create Tender',
            breadcrumb: 'Create Tender',
        },
    },
];

export * from './components/tender-details/tender-details.component';
export * from './components/create-tender/create-tender.component';
