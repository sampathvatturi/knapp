import { UomComponent } from "./components/uom/uom.component";

export const UOM_COMPONENTS = [
    UomComponent
];

export const UOM_ROUTES = [
    {
        path: 'uom',
        component: UomComponent,
        data: {
            title: 'Uom',
            breadcrumb: 'Uom',
        },
    },
];