import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalsComponent } from './approvals/approvals.component';
import { DEPARTMENT_ROUTES } from './department'
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { FundsComponent } from './funds/funds.component';
import { InventoryItemsComponent } from './inventory-items/inventory-items.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PaymentProceedingsComponent } from './payment-proceedings/payment-proceedings.component';
import { TenderDetailsComponent } from './tender-details/tender-details.component';


const routes: Routes = [
  {
    path: 'modules', redirectTo: 'modules/approvals', pathMatch: 'full'
  },
  ...DEPARTMENT_ROUTES,
  {path:'approvals',component:ApprovalsComponent},
  {path:'expenditure',component:ExpenditureComponent},
  {path:'funds',component:FundsComponent},
  {path:'inventory-items',component:InventoryItemsComponent},
  {path:'invoices',component:InvoicesComponent},
  {path:'payment-proceedings',component:PaymentProceedingsComponent},
  {path:'tender-details',component:TenderDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
