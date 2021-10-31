import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: Storage) {
    }

    setItem(key: string, item: any): void {
        this.storage.set(key, JSON.stringify(item));
    }

    getItem(key: string): Observable<any> {
        return fromPromise(this.storage.get(key)).pipe(
            map(res => {
                return JSON.parse(res);
            })
        );
    }

    removeItem(key: string): void {
        this.storage.remove(key);
    }

    clear(): void {
        this.storage.clear();
    }
}
