import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROLE } from '@api-interfaces';
import { roleGuard } from '@app/_core/guards/role.guard';
import { DashboardPage } from '@modules/auth/pages/dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: '',
        redirectTo: 'tracker',
        pathMatch: 'full',
      },
      {
        path: 'tracker',
        loadChildren: () =>
          import('./modules/tracker/tracker.module').then(
            (module) => module.TrackerModule,
          ),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./modules/report/report.module').then(
            (module) => module.ReportModule,
          ),
        canActivate: [roleGuard],
        data: {
          roles: [ROLE.ADMIN],
        },
      },
      {
        path: 'team',
        loadChildren: () =>
          import('./modules/team/team.module').then(
            (module) => module.TeamModule,
          ),
        canActivate: [roleGuard],
        data: {
          roles: [ROLE.ADMIN],
        },
      },
      {
        path: 'clienti',
        loadChildren: () =>
          import('./modules/customer/customer.module').then(
            (module) => module.CustomerModule,
          ),
        canActivate: [roleGuard],
        data: {
          roles: [ROLE.ADMIN],
        },
      },
      {
        path: 'progetti',
        loadChildren: () =>
          import('./modules/project/project.module').then(
            (module) => module.ProjectModule,
          ),
      },
      {
        path: 'etichette',
        loadChildren: () =>
          import('./modules/hoursTag/hoursTag.module').then(
            (module) => module.HoursTagModule,
          ),
        canActivate: [roleGuard],
        data: {
          roles: [ROLE.ADMIN],
        },
      },
      {
        path: 'ferie-permessi',
        loadChildren: () =>
          import('./modules/dayoff/dayoff.module').then(
            (module) => module.DayoffModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
