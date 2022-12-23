import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { OperatorsComponent } from './operators/operators.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatInputModule } from '@angular/material/input';
import { OperatorComponent } from './operator/operator.component';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatNativeDateModule } from '@angular/material/core';
import { MachinesComponent } from './machines/machines.component';
import { MachineComponent } from './machine/machine.component';
import { UserComponent } from './user/user.component';
// import { Auth0Service } from 'src/services/auth0.service';

@NgModule({
  declarations: [
    UsersComponent,
    OperatorsComponent,
    OperatorComponent,
    MachinesComponent,
    MachineComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ClipboardModule,
    MatIconModule,FormsModule,ReactiveFormsModule,MatSelectModule,MatDatepickerModule,MatGridListModule,MatNativeDateModule
  ],
  providers: [],
})
export class UsersModule { }
