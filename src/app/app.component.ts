import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Pages} from './interfaces/pages';
import {ZabbixService} from './shared/service/zabbix.service';
import {StorageService} from './shared/service/storage.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public appPages: Array<Pages>;

    constructor(
        private zabbixService: ZabbixService,
        private storageService: StorageService,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public navCtrl: NavController
    ) {
        this.appPages = [
            {
                title: 'Home',
                url: '/home-results',
                direct: 'root',
                icon: 'home'
            },

            {
                title: 'dashboard',
                url: '/dashboard',
                direct: 'forward',
                icon: 'information-circle-outline'
            },
            {
                title: 'history',
                url: '/history',
                direct: 'forward',
                icon: 'information-circle-outline'
            },
            {
                title: 'Latest data',
                url: '/item',
                direct: 'forward',
                icon: 'information-circle-outline'
            },
            {
                title: 'host',
                url: '/hosts-create',
                direct: 'forward',

            },
            {
                title: 'graph',
                url: '/graphs-pages',
                direct: 'forward',
            },
            {
                title: 'App Settings',
                url: '/settings',
                direct: 'forward',
                icon: 'cog'
            }
        ];

        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        }).catch(() => {
        });
    }


    logout() {
        this.zabbixService.logout().subscribe(() => {
            this.storageService.clear();
            this.navCtrl.navigateRoot('/');
        });
    }

}
