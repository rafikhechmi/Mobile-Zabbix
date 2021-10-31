import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ZabbixService} from '../../shared/service/zabbix.service';
import {HostGroup} from '../../shared/model/host-group';
import {Host} from '../../shared/model/host';
import {Graph} from '../../shared/model/graph';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Filter, filters} from '../../shared/model/filter';
import {StorageService} from '../../shared/service/storage.service';
import {ChartDataSets} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';

@Component({
    selector: 'app-graphs-pages',
    templateUrl: './graphs-pages.page.html',
    styleUrls: ['./graphs-pages.page.scss'],
})
export class GraphsPagesPage implements OnInit, OnDestroy {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    public data: any[] = [];

    public selectedHostGroup: HostGroup;
    public hostGroupItems: HostGroup[] = [];
    public selectedfilter: any;
    public selectedHost: Host;
    public hostItems: Host[] = [];

    public selectedGraph: Graph;
    public graphItems: Graph[] = [];

    public graphUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');

    private firstHostGroupItem: HostGroup = new HostGroup('0', 'all');
    private firstHostItem: Host = new Host();
    private firstgrph: Graph = new Graph();
    private refresher: Subscription;
    public lfilter = [];
    public rs: any[] = [];
    public de: any[] = [];
    public ex: any[] = [];
    public iditems: string;
    public b: any;
    public history: string;
    public itemvaluetype: any;

    filter = new Filter();
    chartData: ChartDataSets[] = [{data: [], label: 'probleme'}];
    chartLabels: Label[];

    // Options
    chartOptions = {
        responsive: true,
        title: {
            display: true,
            text: 'chart'
        },
        pan: {
            enabled: true,
            mode: 'xy'
        },
        zoom: {
            enabled: true,
            mode: 'xy'
        }
    };
    chartColors: Color[] = [
        {
            borderColor: '#ffd931',
            backgroundColor: '#f50009'
        }
    ];
    chartType = 'line';
    showLegend = false;

    // For search
    stock = '';

    constructor(private zabbixService: ZabbixService, private storageService: StorageService) {
    }

    ngOnInit() {
        this.hostGroupItems.push(this.firstHostGroupItem);
        this.selectedHostGroup = this.firstHostGroupItem;

        this.firstHostItem.hostid = '0';
        this.firstHostItem.host = 'all';
        this.hostItems.push(this.firstHostItem);
        this.selectedHost = this.firstHostItem;
        this.filter.name = this.lfilter = filters;
        console.log(this.lfilter);
        this.zabbixService.getHostGroups({'real_hosts': true}).subscribe(res => {
            this.hostGroupItems.push(...res.result);
            console.log(this.hostGroupItems);
        });

        this.zabbixService.getHosts({'with_graphs': true}).subscribe(res => {
            this.hostItems.push(...res.result);
            console.log(this.hostItems);
        });
    }

    public onHostGroupChange(hostGroup: HostGroup): void {
        this.selectedHost = this.firstHostItem;

        this.zabbixService.getHosts({'with_graphs': true, 'groupids': [hostGroup.groupid]}).subscribe(res => {
            this.hostItems = [this.firstHostItem];
            this.hostItems.push(...res.result);
        });
    }

    public onHostChange(host: Host): void {
        this.zabbixService.graph({'sortfield': 'name', 'hostids': [host.hostid]}).subscribe(res => {
            this.graphItems = [this.firstgrph];
            this.graphItems.push(...res.result);
            console.log(this.graphItems);
        });
    }

    public onGraphchange($event): void {

        const graphId: string = this.selectedGraph.graphid;
        const params = {
            'output': 'extend',
            'graphids': graphId,
            selectItems: true,
            selectGraphItems: true,
        };
        console.log(params);
        this.zabbixService.getgraph(params).subscribe(res => {

            console.log(res);

            // this.chartData[0].data = [0];

            res.result.forEach(el => {
                el['units'] = el.items[0].units;
                el['itemid'] = el.items[0].itemid;
                el['history'] = el.items[0].value_type;
            });
            const params1 = {
                'output': 'extend',
                'history': res.result[0].history,
                'itemids': res.result[0].itemid,
                'sortfield': 'clock',
                'sortorder': 'DESC',
                'limit': 50
            };
            this.zabbixService.itemgraph(params1).subscribe(res1 => {
                console.log(params1);
                console.log(res.result[0].history);
                console.log(res1);
                this.chartLabels = [];
                this.chartData[0].data = [];
                for (const result of res1.result) {
                    switch (res.result[0].units) {
                        case '%' : {
                            this.b = result.value / 1000000;
                            break;
                        }
                        case 'B' : {
                            this.b = result.value / 1000000;
                        }
                    }
                    const date = new Date(result.clock * 1000);
                    this.de.push(res1.result);
                    this.chartLabels.push(date.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    }).replace('AM', '').replace('PM', ''));
                    (this.chartData[0].data as number[]).push(result.value);

                }
                console.log(this.chartLabels);
                console.log(this.chartData);
            }, error => {
                console.log(error);
            });
        });
        // const list = event.map(el => el.grap);
        // this.groupId = list;

        // if (this.refresher) {
        //     this.refresher.unsubscribe();
        // }
        //
        // this.refresher = interval(1000).pipe(
        //     mergeMap(() => {
        //         return this.storageService.getItem('baseUrl');
        //     })
        // ).subscribe(baseUrl => {
        //     const hostGroupId: string = this.selectedHostGroup.groupid;
        //     const hostId: string = this.selectedHost.hostid;
        //     const graphId: string = this.selectedGraph.graphid;
        //     const url = `${baseUrl}/zabbix/chart2.php?&groupid=${hostGroupId}
        // &hostid=${hostId}&graphid=${graphId}&` + Math.random();
        //     this.graphUrl.next(url);
        // });
    }

    onfilterChange(event) {
        // if (this.refresher) {
        //     this.refresher.unsubscribe();
        // }
        //
        // this.refresher = interval(1000).pipe(
        //     mergeMap(() => {
        //         return this.storageService.getItem('baseUrl');
        //     })
        // ).subscribe(baseUrl => {
        //     const hostGroupId: string = this.selectedHostGroup.groupid;
        //     const hostId: string = this.selectedHost.hostid;
        //     const graphId: string = this.selectedGraph.graphid;
        //     const url1 = `${baseUrl}/zabbix/chart2.php?&groupid=${hostGroupId}&hostid=
        // ${hostId}&graphid=${graphId}&from=now-${event.value}&to=now&profileIdx=web.graphs.filter` + Math.random();
        //     this.graphUrl = new BehaviorSubject<string>('');
        //     this.graphUrl.next(url1);
        // });

    }

    ngOnDestroy() {
        if (this.refresher) {
            this.refresher.unsubscribe();
        }

    }

    typeChanged(e) {
        const on = e.detail.checked;
        this.chartType = on ? 'bar' : 'line';
    }
}
