import {Component, OnInit, ViewChild} from '@angular/core';
import {ZabbixService} from '../../shared/service/zabbix.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ModalController} from '@ionic/angular';
import {GraphPage} from '../modal/graph/graph.page';
import * as _ from 'lodash';


@Component({
    selector: 'app-about',
    templateUrl: './item.page.html',
    styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

    public filteredData: any[] = [];
    public hosts: any[] = [];
    public filterText: string;
    @ViewChild(DatatableComponent) table: DatatableComponent;

    private data: any[] = [];

    constructor(private zabbixService: ZabbixService, public modalCtrl: ModalController) {
    }

    ngOnInit(): void {
        const params = {
            'output': ['host', 'hostid', 'groupids']
        };
        this.zabbixService.getHosts(params).subscribe(res => {
            console.log(res);
            this.hosts = res.result;
            const hostIds: string[] = this.hosts.map(host => host.hostid);

            const params2 = {
                'filter': {
                    'hostid': hostIds
                },
                'selectGraphs': true,
                'sortfield': 'name',
            };
            this.zabbixService.getItems(params2).subscribe(res2 => {
                console.log(res2);
                this.data = res2.result;
                this.data.forEach(el => {
                    el['hostName'] = this.getHostName(el.hostid);
                });
                this.filteredData = _.cloneDeep(this.data);
            }, error => {
                console.log(error);
            });
        }, error => {
            console.log(error);
        });
    }

    async openModal(row) {
        const modal = await this.modalCtrl.create({
            component: GraphPage,
            componentProps: {data: row.itemid}
        });
        return await modal.present();
    }

    private getHostName(hostId): string {
        let hostName = '';
        this.hosts.map(el => {
            if (el.hostid === hostId) {
                hostName = el.host;
            }
        });
        return hostName;
    }

    updateFilter(event) {
        console.log(event);

        this.filteredData = _.cloneDeep(this.data).filter(d => {
            return event ? d.hostName.toLowerCase().indexOf(event.toLowerCase()) !== -1 : true;
        });
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }
}
