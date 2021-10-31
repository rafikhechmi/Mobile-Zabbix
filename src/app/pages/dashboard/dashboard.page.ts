import {Component, OnInit} from '@angular/core';
import {ZabbixService} from '../../shared/service/zabbix.service';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    chartData: ChartDataSets[] = [{data: [], label: 'porbleme'}];
    chartLabels: Label[];

    // Options
    chartOptions = {
        responsive: true,
        title: {
            display: true,
            text: 'Historic Stock price'
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
    chartType = 'bar';
    showLegend = false;

    // For search
    stock = '';

    constructor(private zabbixService: ZabbixService) {
    }

    public data: any[] = [];
    public filteredData: any[] = [];
    public hosts: any[] = [];
    public rs: any[] = [];
    public columns: any[] = [];
    public ex: any[] = [];
    public rp: any[] = [];

    ngOnInit() {
        this.columns = [
            {name: 'Host Name', prop: 'hostName'}
        ];
        const params = {
            'output': ['host', 'hostid', 'groupids']
        };
        this.zabbixService.getHosts(params).subscribe(res => {
            console.log(res);
            this.hosts = res.result;
            this.hosts.forEach(el => {
                const a = el.host;
                el['hostid'] = (el.hostid);
                console.log(a);
                const params2 = {
                    'hostids': el.hostid,
                    'recent': 'false ',
                    // 'countOutput': true ,
                };

                this.zabbixService.problemget(params2).subscribe(res2 => {
                    res2['hostName'] = a;

                    this.data = res2.result;
                    this.rs.push(res2);
                    console.log(this.rs);
                    const not_classified = this.data.filter(x => x.severity === '0');
                    const information = this.data.filter(x => x.severity === '1');
                    const warning = this.data.filter(x => x.severity === '2');
                    const average = this.data.filter(x => x.severity === '3');
                    const high = this.data.filter(x => x.severity === '4');
                    const disaster = this.data.filter(x => x.severity === '5');
                    res2['warning'] = warning.length;
                    res2['not_classified'] = not_classified.length;
                    res2['information'] = information.length;
                    res2['average'] = average.length;
                    res2['high'] = high.length;
                    res2['disaster'] = disaster.length;
                    this.chartLabels = [];
                    this.chartData[0].data = [];
                    for (const entry of this.rs) {
                        this.chartLabels.push(entry.hostName);
                        (this.chartData[0].data as number[]).push(entry.result.length);
                    }
                }, error => {
                    console.log(error);
                });
            });
        });
    }

    typeChanged(e) {
        const on = e.detail.checked;
        this.chartType = on ? 'line' : 'bar';
    }
}

