import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeverityPipe} from './severity.pipe';

 // noinspection JSAnnotator

@NgModule({
    declarations: [SeverityPipe], // <---
    imports: [CommonModule],
    exports: [SeverityPipe] // <---
})

export class MainPipe {}
