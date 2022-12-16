import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DEPARTMENT_ROUTES } from './department';
import { APPROVALS_ROUTES } from './approvals';
import { DASHBOARD_ROUTES } from './dashboard';
import { EXPENDITURE_ROUTES } from './expenditure';
import { FUNDS_ROUTES } from './funds';
import { INVENTORY_ITEMS_ROUTES } from './inventory-items';
import { INVOICES_ROUTES } from './invoices';
import { PAYMENT_PROCEEDINGS_ROUTES } from './payment-proceedings';
import { TENDER_DETAILS_ROUTES } from './tender-details';
import { PROFILE_ROUTES } from '../layouts/user/profile';
import { USER_ACCOUNTS_ROUTES } from './user-accounts';
import { VENDORS_ROUTES } from './vendors';
import { WORKS_ROUTES } from './works';
import { SURVEY_REPORT_ROUTES } from './survey-report';
import { WORK_ORDERS_ROUTES } from './work-orders';
import { ACCOUNTING_DETAILS_ROUTES } from './accounting-details';
import { TRANSACTION_DETAILS_ROUTES } from './transaction-details';
import { UOM_ROUTES } from './masters';
import { CREATE_TENDER_ROUTES } from './tender-details';
import { ASSIGN_TENDER_ROUTES } from './tender-details';
import { ACCOUNTS_ROUTES } from './accounts';


const routes: Routes = [
  {
    path: 'modules',
    redirectTo: 'modules/dashboard',
    pathMatch: 'full',
  },
  ...DASHBOARD_ROUTES,
  ...DEPARTMENT_ROUTES,
  ...APPROVALS_ROUTES,
  ...EXPENDITURE_ROUTES,
  ...FUNDS_ROUTES,
  ...INVENTORY_ITEMS_ROUTES,
  ...INVOICES_ROUTES,
  ...PAYMENT_PROCEEDINGS_ROUTES,
  ...TENDER_DETAILS_ROUTES,
  ...PROFILE_ROUTES,
  ...USER_ACCOUNTS_ROUTES,
  ...VENDORS_ROUTES,
  ...WORKS_ROUTES,
  ...SURVEY_REPORT_ROUTES,
  ...WORK_ORDERS_ROUTES,
  ...ACCOUNTING_DETAILS_ROUTES,
  ...TRANSACTION_DETAILS_ROUTES,
  ...UOM_ROUTES,
  ...CREATE_TENDER_ROUTES,
  ...ASSIGN_TENDER_ROUTES,
  ...ACCOUNTS_ROUTES,
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
