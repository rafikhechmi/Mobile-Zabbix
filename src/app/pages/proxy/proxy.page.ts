import { Component, OnInit } from '@angular/core';
import {ZabbixService} from '../../shared/service/zabbix.service';



@Component({
  selector: 'app-proxy',
  templateUrl: './proxy.page.html',
  styleUrls: ['./proxy.page.scss'],
})
export class ProxyPage implements OnInit {

    public data: any[] = [];

    constructor(private zabbixService: ZabbixService
    ) {
    }
    ngOnInit() {}
}
