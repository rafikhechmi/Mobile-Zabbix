import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proxyName'
})
export class ProxyNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      switch (value) {
          case 0: {
              return 'No compression';
              break;
          }
          case 1: {
              return 'No encryption';
              break;
          }
          case 2: {
              return 'PSK';
              break;
          }
          case 4: {
              return 'certificate';
              break;
          }
          case 5: {
              return 'active proxy';
              break;
          }
          case 6: {
              return 'passive proxy';
              break;
          }

          default: {
              return null ;
              break;
          }
      }
      return null;
  }

}
