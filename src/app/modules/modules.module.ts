import {
    NgModule,
} from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { DEPARTMENT_COMPONENTS } from './department';
import { TenderDetailsComponent } from './tender-details/tender-details.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { PaymentProceedingsComponent } from './payment-proceedings/payment-proceedings.component';
import { InventoryItemsComponent } from './inventory-items/inventory-items.component';
import { FundsComponent } from './funds/funds.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';

@NgModule({
    declarations: [        
        ...DEPARTMENT_COMPONENTS, TenderDetailsComponent, InvoicesComponent, ApprovalsComponent, PaymentProceedingsComponent, InventoryItemsComponent, FundsComponent, ExpenditureComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent,
    ],
    imports: [ModulesRoutingModule],
})

export class ModulesModule { }