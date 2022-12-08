import { WorkOrdersComponent } from './components/work-orders/work-orders.component';

export const WORK_ORDERS_COMPONENTS = [
    WorkOrdersComponent,
];

export const WORK_ORDERS_ROUTES = [
    {
        path: 'work-orders',
        component: WorkOrdersComponent,
        data: {
            title: 'Work Orders',
            breadcrumb: 'Work Orders',
        },
    },
];

export * from './components/work-orders/work-orders.component';
