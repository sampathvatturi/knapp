import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { USER_ROUTES } from './layouts/user';
import { HomeComponent } from './layouts/home/home.component';
import { RouteGuardService } from './services/auth/route-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: '/app/modules',
        pathMatch: 'full',
      },
      {
        path: 'modules',
        loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
        // canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin','user']
        }
      },
    ]
  },
  ...USER_ROUTES,
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
