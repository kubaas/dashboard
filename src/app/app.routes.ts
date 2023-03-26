import { Routes } from '@angular/router';
import { LogoutComponent } from 'libs/shared/src/lib/logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GainersAndLosersComponent } from './gainers-and-losers/gainers-and-losers.component';
import { DefaultComponent } from './layout/default/default.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'gainers-and-losers', component: GainersAndLosersComponent },
      { path: 'logout', component: LogoutComponent },
    ],
  },
];
