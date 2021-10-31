import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Login, UserCredentials} from '../model/login';
import {StorageService} from './storage.service';
import {forkJoin, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {HostGroup} from '../model/host-group';
import {HostCreationParams} from '../model/host-creation-params';

@Injectable({
    providedIn: 'root'
})
export class ZabbixService {
    private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    private urlExtra = '/zabbix/api_jsonrpc.php';

    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    authenticate(baseUrl: string, userCredentials: UserCredentials): Observable<any> {
        userCredentials.userData = true;
        const des3 = new Login('1', 'user.login', '2.0', userCredentials);

        return this.http.post<any>(baseUrl + this.urlExtra, des3, this.httpOptions).pipe(
            map(res => {
                if (res.error) {
                    throw new Error(res.error.message);
                }
                return res;
            })
        );
    }

    logout(): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body = new Login('1', 'user.logout', '2.0', [], res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }


    getUserGroup(params: string): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('2', 'usergroup.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }

    getHostGroups(params): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('2', 'hostgroup.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }

    getHosts(params): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('2', 'host.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }

    getalert(): Observable<any> {
        const params = {
            selectHosts: 'extend',
            output: 'extend',
            select_acknowledges: 'extend',
            selectTags: 'extend',
            sortfield: ['clock', 'eventid'],
            sortorder: 'DESC'

        };

        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                console.log(res[0], res[1]);
                const body: Login = new Login('2', 'event.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }

    hostgroup(): Observable<HostGroup[]> {
        const params = {
            output: 'extend',
        };
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('2', 'hostgroup.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            }),
            map(res => {
                const hostGroups: HostGroup[] = [];
                res.result.forEach(el => {
                    hostGroups.push(new HostGroup(el.groupid, el.name, el.flags, el.internal));
                });
                return hostGroups;
            })
        );
    }

    getItems(params): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('1', 'item.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }

    graph(params): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('1', 'graph.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }

    graphitem(params): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('1', 'graphitem.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }

    proxy(): Observable<any> {
        const params = {
            'sortfield': [
                'hostid',
                'host',
                'status'
            ],
            'output': 'extend',
            'selectInterface': ' extend',
            'selectHosts': [
                'host',
                'available',
                'description'
            ],
        };

        // TODO handle invalid response
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('2', 'proxy.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }


    createHost(hostParams: HostCreationParams): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('2', 'host.create', '2.0', hostParams, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }

    templatehost(): Observable<any> {
        const params = {
            'output': 'extend',
        };

        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('2', 'template.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }
    problemget(params): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('1', 'problem.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }
    deleteHost(hostIds: string[]): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('2', 'host.delete', '2.0', hostIds, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }
    itemgraph(params): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('1', 'history.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }
    getgraph(params): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('1', 'graph.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }
    eventget(params): Observable<any> {
        return forkJoin(
            this.storageService.getItem('baseUrl'),
            this.storageService.getItem('token')
        ).pipe(
            mergeMap((res: string[]) => {
                const body: Login = new Login('1', 'event.get', '2.0', params, res[1]);
                return this.http.post<any>(res[0] + this.urlExtra, body, this.httpOptions);
            })
        );
    }
}
