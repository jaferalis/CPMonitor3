import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoriesComponent } from './inventories/inventories.component';
import { InventoryComponent } from './inventory/inventory.component';


@NgModule({
  declarations: [
    InventoriesComponent,
    InventoryComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
