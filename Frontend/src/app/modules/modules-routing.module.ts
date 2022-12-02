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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
