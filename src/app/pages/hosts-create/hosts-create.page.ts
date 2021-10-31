import {Component, OnInit} from '@angular/core';
import {ZabbixService} from '../../shared/service/zabbix.service';
import {AlertController, ModalController} from '@ionic/angular';
import {SecondPage} from '../modal/second/second.page';
import {Host} from '../../shared/model/host';



@Component({
    selector: 'app-hosts-create',
    templateUrl: './hosts-create.page.html',
    styleUrls: ['./hosts-create.page.scss'],
})
export class HostsCreatePage implements OnInit {

    constructor(private zabbixService: ZabbixService,
                public modalCtrl: ModalController,
                public alertController: AlertController,
    ) {
    }

    public data: any[] = [];
    public data2: Host[] = [];
    public data3: any[] = [];

    private params2;



        ngOnInit() {
            this.params2 = {
            'sortfield': [
                'hostid',
                'host',
                'status',
                'name'
            ],
            'selectParentTemplates': [
                'templateid',
                'name'
            ],
            'selectInterfaces': [
                'ip',
                'port'
            ],
        };
        this.loadHosts();
    }

    private loadHosts() {
        this.zabbixService.getHosts(this.params2).subscribe(res => {
            console.log(res);
            this.data2 = res.result;
            this.loadHosts();
        }, error => {
            console.log(error);
        });
    }

    async openModal() {
        const modal = await this.modalCtrl.create({
            component: SecondPage
        });
        return await modal.present();
    }



    deleteHost(host: Host) {
        console.log(host);
        this.zabbixService.deleteHost([host.hostid]).subscribe(res => {
            console.log(res);

            this.loadHosts();
        }, err => {
            console.log(err);
        });
    }
}


