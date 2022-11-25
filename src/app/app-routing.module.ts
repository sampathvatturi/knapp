import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './modules/user/forgot-password/forgot-password.component';
import { LoginComponent } from './modules/user/login/login.component';
import { RegisterComponent } from './modules/user/register/register.component';

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
    path: 'modules',
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)
  },
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'forgot-password',component: ForgotPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
