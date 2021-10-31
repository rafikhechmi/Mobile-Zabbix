import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HostsCreatePage } from './hosts-create.page';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';


const routes: Routes = [
  {
    path: '',
    component: HostsCreatePage,
  }
];

@NgModule({
    imports: [
    FormsModule,
      NgxDatatableModule,
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
    RouterModule.forChild(routes),
  ],

    declarations: [HostsCreatePage],
})

export class HostsCreatePageModule {}
