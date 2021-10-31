import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {ZabbixService} from '../../../shared/service/zabbix.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {File} from '@ionic-native/file/ngx';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {StorageService} from '../../../shared/service/storage.service';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {timestamp} from 'rxjs/operators';


@Component({
    selector: 'app-graph',
    templateUrl: './graph.page.html',
    styleUrls: ['./graph.page.scss'],
    providers: [FileTransfer, File]
})
export class GraphPage implements OnInit, OnDestroy {
    private refresher: Subscription;
    private fileTransfer: FileTransferObject = this.transfer.create();
    private oldFileName = '';
    private win: any = window;
    public data: any[] = [];
    public filteredData: any[] = [];
    public hosts: any[] = [];
    public rs: any[] = [];
    public de: any[] = [];
    public ex: any[] = [];
    public graphUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
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

    constructor(
        private modalController: ModalController,
        private transfer: FileTransfer, private file: File,
        private zabbixService: ZabbixService, public navParams: NavParams,
        private storageService: StorageService,
    ) {
    }

    ngOnInit() {
        // if (this.refresher) {
        //     this.refresher.unsubscribe();
        // }
        //
        // this.refresher = interval(2000).pipe(
        //     mergeMap(() => {
        //         return this.storageService.getItem('baseUrl');
        //     })
        // ).subscribe(baseUrl => {
        //     const id = this.navParams.get('data');
        //     const url = `${baseUrl}/zabbix/chart.php?&itemids[]=${id}&.png`;
        //     const newFileName = `graph_${Math.random()}.png`;
        //     fromPromise(this.fileTransfer.download(url, this.file.dataDirectory + newFileName)).subscribe((res) => {
        //         fromPromise(this.file.removeFile(this.file.dataDirectory, this.oldFileName)).subscribe(() => {
        //             this.oldFileName = newFileName;
        //         });
        //         this.graphUrl.next(res.toURL());
        //         console.log(res, this.file);
        //     });
        // });
        const id = this.navParams.get('data');
        console.log(id);

        const params1 = {
            'output': 'extend',
            'itemids': id,
        };
        console.log(params1);
        this.zabbixService.getgraph(params1).subscribe(res => {
            console.log(res);
            this.rs.push(res.result);
            console.log(this.rs);
        }, error => {
            console.log(error);
        });

        const params = {
            'output': 'extend',
            'itemids': id,
            'sortfield': 'clock',
            'sortorder': 'DESC',
            'limit': 50
        };
        console.log(params);
        this.zabbixService.itemgraph(params).subscribe(res => {
            console.log(res);
            this.rs.push(res.result);
            console.log(this.rs);
            this.chartLabels = [];
                    this.chartData[0].data = [];
                    for (const entry of this.rs) {
                        for (const result of entry) {
                            const clock1: any = result.clock;
                            const unixTime = clock1;
                            const date = new Date(unixTime * 1000);
                            this.de.push(res.result);
                            console.log(date.toLocaleTimeString());
                            this.chartLabels.push(date.toLocaleTimeString());
                            (this.chartData[0].data as number[]).push(result.value);
                }
            }
        }, error => {
            console.log(error);
        });
    }

    ngOnDestroy() {
        if (this.refresher) {
            this.refresher.unsubscribe();
        }
    }

    async closeModal() {
        await this.modalController.dismiss();
    }
    typeChanged(e) {
        const on = e.detail.checked;
        this.chartType = on ? 'line' : 'bar';
    }

}
