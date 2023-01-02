import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import {ClipboardModule} from '@angular/cdk/clipboard';
import { DeviceComponent } from './device/device.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    DevicesComponent,
    DeviceComponent,
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    ClipboardModule,
    MatGridListModule,
    MatInputModule,MatIconModule, FormsModule,ReactiveFormsModule,MatToolbarModule,MatCheckboxModule,
    MatSortModule, MatTableModule, MatPaginatorModule,MatSelectModule
  ]
})
export class DevicesModule { }
