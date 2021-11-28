import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  store: any;

  constructor() {
    this.store = sessionStorage;
  }
  set(key: string, value: object): any {
    const storeData = this.get(key);
    return this.store.setItem(key, JSON.stringify({...storeData, ...value}));
  }
  get(key: string): any{
    return JSON.parse(this.store.getItem(key));
  }
  remove(key: string) {
    this.store.removeItem(key);
  }
  clear() {
    this.store.clear();
  }
}
