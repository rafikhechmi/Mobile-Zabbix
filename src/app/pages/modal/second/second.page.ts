import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ZabbixService} from '../../../shared/service/zabbix.service';
import {HostCreationParams} from '../../../shared/model/host-creation-params';
import {UserCredentials} from '../../../shared/model/login';
import {HostGroup} from '../../../shared/model/host-group';
import {HostInterface} from '../../../shared/model/host-interface';

@Component({
    selector: 'app-second',
    templateUrl: './second.page.html',
    styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {
    public data: HostGroup[] = [];
    public data2: any[] = [];
    public selectValue: number;
    public groupList: any[];
    public hostParams: HostCreationParams = new HostCreationParams();


    constructor(private modalController: ModalController, private zabbixService: ZabbixService) {
    }

    ngOnInit() {
        this.zabbixService.hostgroup().subscribe((res) => {
            console.log(res);
            this.data = res;
        }, error => {
            console.log(error);
        });
        const defaultInterface = new HostInterface();
        defaultInterface.type = 1;
        defaultInterface.ip = '127.0.0.1';
        defaultInterface.dns = '';
        defaultInterface.port = '10050';
        defaultInterface.useip = 1;
        defaultInterface.main = 1;
        this.hostParams.interfaces = [defaultInterface];

        this.zabbixService.templatehost().subscribe((res) => {
            console.log(res);
            this.data2 = res.result;
        }, error => {
            console.log(error);
        });
    }

    async closeModal() {
        await this.modalController.dismiss();
    }

    showChange(event) {
        console.log(this.hostParams, event);
    }
    templatechois(event) {
        const list = event.map(el => el.templateid);
        this.hostParams.templates = list;
        console.log(event);
    }

    createHost() {
        this.zabbixService.createHost(this.hostParams).subscribe(res => {
            console.log(res);
            this.modalController.dismiss();
        }, error => {
            console.log(error);
        });
    }
}
