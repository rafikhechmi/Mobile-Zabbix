import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoryPage } from './history.page';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MainPipe} from '../../shared/pipe/main-pipe.module';

const routes: Routes = [
  {
    path: '',
    component: HistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
      MainPipe,
    FormsModule,
      NgxDatatableModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
