import {Component, OnInit, ViewChild} from '@angular/core';
import {ZabbixService} from '../../shared/service/zabbix.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ModalController} from '@ionic/angular';
import {SeverityPipe} from '../../shared/pipe/severity.pipe';


@Component({
    selector: 'app-home-results',
    templateUrl: './home-results.page.html',
    styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage implements OnInit {

    public data: any[] = [];
    public data2: any[] = [];


    constructor(private zabbixService: ZabbixService ) {
    }

    ngOnInit(): void {
        const params2 = {
            'output': 'extend',
            'selectAcknowledges': 'extend',
            'selectTags': 'extend',
            'selectSuppressionData': 'extend',
            'recent': 'false ',
            'sortfield': ['eventid'],
            'sortorder': 'DESC'
        };

        this.zabbixService.problemget(params2).subscribe(res => {
            this.data = res.result;
            console.log(res);
        }, error => {
            console.log(error);
        });
    }

    public getCellClass({row, column, value}): any {
        let clazz;
            if (row.severity === '1') {
                clazz = ' blue ';

            } else if (row.severity === '2') {
                clazz = ' green ';
            } else  if (row.severity === '3') {
                clazz = ' yellow ';
            } else {
                clazz = ' red ';
            }
        console.log();
        return clazz;
    }

}
