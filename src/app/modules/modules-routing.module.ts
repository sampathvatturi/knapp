import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DEPARTMENT_ROUTES } from './department'


const routes: Routes = [
  {
    path: '', redirectTo: 'department', pathMatch: 'full'
  },
  ...DEPARTMENT_ROUTES,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
