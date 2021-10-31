import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'severity'
})
export class SeverityPipe implements PipeTransform {

    transform(value: any, args?: number): any {
         if (value == 0) {
             return 'not classified';
        } else if (value == 1) {
            return 'information';}
        else if (value == 2) {
            return 'warning'; }
        else if (value == 3) {
            return 'average';
        } else if (value == 4) {
            return 'average';
        }  if (value == 5) {
            return 'disaster'; }
                // switch (value) {
                //     case 0: {
                //         return 'not classified';
                //         break;
                //     }
                //     console.log(value);
                //     case 1: {
                //         return 'information';
                //         break;
                //     }
                //     case 2: {
                //        return'warning';
                //         break;
                //     }
                //     case 3: {
                //        return 'average';
                //         break;
                //     }
                //     case 4: {
                //        return 'high';
                //         break;
                //     }
                //     case 5: {
                //         return 'disaster';
                //         break;
                //     }
        //
}}
