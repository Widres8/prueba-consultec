import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateComponent } from '@core/layout/private.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      // {
      //   path: 'simulator',
      //   canActivate: [AuthGuard],
      //   loadChildren: () =>
      //     import('./modules/simulator/simulator.module').then(
      //       (m) => m.SimulatorModule
      //     ),
      // },
      // {
      //   path: 'requestment',
      //   canActivate: [AuthGuard],
      //   loadChildren: () =>
      //     import('./modules/requestment/requestment.module').then(
      //       (m) => m.RequestmentModule
      //     ),
      // },
      // { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
  // {
  //   path: 'general',
  //   loadChildren: () =>
  //     import('./modules/general/general.module').then((m) => m.GeneralModule),
  // },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/general/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
