import { Component, OnInit } from '@angular/core';
import {ZabbixService} from '../../shared/service/zabbix.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
    public data: any[] = [];

  constructor(private zabbixService: ZabbixService) { }

  ngOnInit() {
      const params2 = {
          'output': 'extend',

      };
      this.zabbixService.getalert().subscribe(res => {
          console.log(res);
          this.data = res.result;
      }, error => {
          console.log(error);
      });
  }


}
