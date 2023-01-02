import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  { path: 'devices', loadChildren: () => import('./devices/devices.module').then(m => m.DevicesModule) },
  { path: 'devices/device', loadChildren: () => import('./devices/devices.module').then(m => m.DevicesModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },

  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'users/operators', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'users/operator', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'users/machines', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'users/machine', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'users/user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
