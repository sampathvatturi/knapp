import { NgModule } from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { DEPARTMENT_COMPONENTS } from './department';
import { APPROVALS_COMPONENTS } from './approvals';
import { DASHBOARD_COMPONENTS } from './dashboard'

import { NgAntdModule } from '../shared/ng-antd.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EXPENDITURE_COMPONENTS } from './expenditure';
import { FUNDS_COMPONENTS } from './funds';
import { INVENTORY_ITEMS_COMPONENTS } from './inventory-items';
import { INVOICES_COMPONENTS } from './invoices';
import { PAYMENT_PROCEEDINGS_COMPONENTS } from './payment-proceedings';
import { TENDER_DETAILS_COMPONENTS } from './tender-details';

@NgModule({
  declarations: [
    ...DASHBOARD_COMPONENTS,
    ...DEPARTMENT_COMPONENTS,
    ...APPROVALS_COMPONENTS,
    ...EXPENDITURE_COMPONENTS,
    ...FUNDS_COMPONENTS,
    ...INVENTORY_ITEMS_COMPONENTS,
    ...INVOICES_COMPONENTS,
    ...PAYMENT_PROCEEDINGS_COMPONENTS,
    ...TENDER_DETAILS_COMPONENTS
  ],
  imports: [ModulesRoutingModule, NgAntdModule, ReactiveFormsModule,CommonModule],
})
export class ModulesModule {}
