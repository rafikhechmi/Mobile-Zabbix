import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {UserCredentials} from '../../shared/model/login';
import {StorageService} from '../../shared/service/storage.service';
import {ZabbixService} from '../../shared/service/zabbix.service';
import {AlertController} from '@ionic/angular';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    credentials: UserCredentials = new UserCredentials();
    baseUrl = 'http://192.168.246.152';
    errormsg: string;

    constructor(
        private router: Router,
        private zabbixService: ZabbixService, private storageService: StorageService,
        public alertController: AlertController
    ) {
    }

    ngOnInit() {
    }

    login() {
        this.zabbixService.authenticate(this.baseUrl, this.credentials).subscribe(result => {
            console.log(result);
            if (result.result) {
                this.storageService.setItem('token', result.result.sessionid);
                this.storageService.setItem('baseUrl', this.baseUrl);
                this.router.navigate(['/home-results']);
            }
        }, error => {
            console.log(error);
            this.errormsg = error.message;
        });

    }


}
