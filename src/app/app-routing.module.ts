import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

// const routes: Routes = [
//   { path: 'dashboard', component: DashboardComponent },
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
// ];

const routes: Routes = [  
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'dept',
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
