import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { DevicesComponent } from './devices.component';

const routes: Routes = [{ path: '', component: DevicesComponent },
{path:'device', component: DeviceComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
