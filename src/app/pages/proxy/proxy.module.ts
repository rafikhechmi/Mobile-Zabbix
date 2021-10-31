import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProxyPage } from './proxy.page';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ProxyNamePipe} from '../../shared/pipe/proxy-name.pipe';

const routes: Routes = [
  {
    path: '',
    component: ProxyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
      NgxDatatableModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProxyPage ]
})
export class ProxyPageModule {}
