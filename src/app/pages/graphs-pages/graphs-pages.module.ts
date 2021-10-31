import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GraphsPagesPage } from './graphs-pages.page';
import {ChartsModule} from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: GraphsPagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ChartsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GraphsPagesPage]
})
export class GraphsPagesPageModule {}
