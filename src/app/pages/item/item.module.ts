import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ItemPage } from './item.page';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    component: ItemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      NgxDatatableModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ItemPage]
})
export class ItemModule {}
