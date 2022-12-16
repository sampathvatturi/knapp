import { NgModule } from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { DEPARTMENT_COMPONENTS } from './department';
import { APPROVALS_COMPONENTS } from './approvals';
import { DASHBOARD_COMPONENTS } from './dashboard';
import { NgAntdModule } from '../shared/ng-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EXPENDITURE_COMPONENTS } from './expenditure';
import { FUNDS_COMPONENTS } from './funds';
import { INVENTORY_ITEMS_COMPONENTS } from './inventory-items';
import { INVOICES_COMPONENTS } from './invoices';
import { PAYMENT_PROCEEDINGS_COMPONENTS } from './payment-proceedings';
import { ASSIGN_TENDER_ROUTES, TENDER_DETAILS_COMPONENTS } from './tender-details';
import { PROFILE_COMPONENTS } from '../layouts/user/profile';
import { USER_ACCOUNTS_COMPONENTS } from './user-accounts';
import { VENDORS_COMPONENTS } from './vendors';
import { WORKS_COMPONENTS } from './works';
import { NgChartsModule } from 'ng2-charts';
import { SURVEY_REPORT_COMPONENTS } from './survey-report';
import { WORK_ORDERS_COMPONENTS } from './work-orders';
import { ACCOUNTING_DETAILS_COMPONENTS } from './accounting-details';
import { TRANSACTION_DETAILS_COMPONENTS } from './transaction-details';
import { UOM_COMPONENTS } from './masters';
import { CREATE_TENDER_COMPONENTS } from './tender-details';
import { ASSIGN_TENDER_COMPONENTS } from './tender-details';
import { ACCOUNTS_COMPONENTS } from './accounts';

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
    ...TENDER_DETAILS_COMPONENTS,
    ...PROFILE_COMPONENTS,
    ...USER_ACCOUNTS_COMPONENTS,
    ...VENDORS_COMPONENTS,
    ...WORKS_COMPONENTS,
    ...SURVEY_REPORT_COMPONENTS,
    ...WORK_ORDERS_COMPONENTS,
    ...ACCOUNTING_DETAILS_COMPONENTS,
    ...TRANSACTION_DETAILS_COMPONENTS,
    ...UOM_COMPONENTS,
    ...CREATE_TENDER_COMPONENTS,
    ...ASSIGN_TENDER_COMPONENTS,
    ...ACCOUNTS_COMPONENTS

  ],
  imports: [
    ModulesRoutingModule,
    NgAntdModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgChartsModule,
  ],
})
export class ModulesModule {}
