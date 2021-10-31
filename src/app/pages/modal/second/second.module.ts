import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SecondPage } from './second.page';
import {HostsCreatePage} from '../../hosts-create/hosts-create.page';


const routes: Routes = [
    {
        path: '',
        component: SecondPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)

    ],
    declarations: [SecondPage],
    entryComponents: [SecondPage]
})
export class SecondPageModule {}
