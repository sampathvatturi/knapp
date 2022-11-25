import { NgModule } from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { DEPARTMENT_COMPONENTS } from './department';

import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { FundsComponent } from './funds/funds.component';
import { InventoryItemsComponent } from './inventory-items/inventory-items.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PaymentProceedingsComponent } from './payment-proceedings/payment-proceedings.component';
import { TenderDetailsComponent } from './tender-details/tender-details.component';
import { NgAntdModule } from '../shared/ng-antd.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ...DEPARTMENT_COMPONENTS,
    TenderDetailsComponent,
    InvoicesComponent,
    ApprovalsComponent,
    PaymentProceedingsComponent,
    InventoryItemsComponent,
    FundsComponent,
    ExpenditureComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  imports: [ModulesRoutingModule, NgAntdModule, ReactiveFormsModule,CommonModule],
})
export class ModulesModule {}
