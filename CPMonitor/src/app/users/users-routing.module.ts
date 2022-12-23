import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachineComponent } from './machine/machine.component';
import { MachinesComponent } from './machines/machines.component';
import { OperatorComponent } from './operator/operator.component';
import { OperatorsComponent } from './operators/operators.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users.component';




const routes: Routes = [{ path: '', component: UsersComponent },
{path:'operators', component: OperatorsComponent},
{path:'operator', component: OperatorComponent},
{path: 'machines', component: MachinesComponent},
{path:'machine', component: MachineComponent},
{path:'user', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
