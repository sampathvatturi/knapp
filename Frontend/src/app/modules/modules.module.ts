import { NgModule } from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { DEPARTMENT_COMPONENTS } from './department';
import { APPROVALS_COMPONENTS } from './approvals';
import { DASHBOARD_COMPONENTS } from './dashboard'
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { FundsComponent } from './funds/funds.component';
import { InventoryItemsComponent } from './inventory-items/inventory-items.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PaymentProceedingsComponent } from './payment-proceedings/payment-proceedings.component';
import { TenderDetailsComponent } from './tender-details/tender-details.component';
import { NgAntdModule } from '../shared/ng-antd.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    ...DASHBOARD_COMPONENTS,
    ...DEPARTMENT_COMPONENTS,
    ...APPROVALS_COMPONENTS,
    TenderDetailsComponent,
    InvoicesComponent,
    PaymentProceedingsComponent,
    InventoryItemsComponent,
    FundsComponent,
    ExpenditureComponent,
    DashboardComponent,
  ],
  imports: [ModulesRoutingModule, NgAntdModule, ReactiveFormsModule,CommonModule],
})
export class ModulesModule {}
