import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PopmenuComponent } from './../../components/popmenu/popmenu.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HomeResultsPage } from './home-results.page';
import {ZabbixService} from '../../shared/service/zabbix.service';
import {MainPipe} from '../../shared/pipe/main-pipe.module';

const routes: Routes = [
  {
    path: '',
    component: HomeResultsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      MainPipe,
      NgxDatatableModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeResultsPage, PopmenuComponent]
})
export class HomeResultsPageModule {}
