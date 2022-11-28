import { PaymentProceedingsComponent } from './components/payment-proceedings/payment-proceedings.component';

export const  PAYMENT_PROCEEDINGS_COMPONENTS = [
    PaymentProceedingsComponent,
];

export const  PAYMENT_PROCEEDINGS_ROUTES = [
    {
        path: 'payment-proceedings',
        component: PaymentProceedingsComponent,
        data: {
            title: 'Payment Proceedings',
            breadcrumb: 'Payment Proceedings',
        },
    },
];

export * from './components/payment-proceedings/payment-proceedings.component';
