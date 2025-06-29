import { Injectable } from '@angular/core';
import { StorageKeyEnum } from './storage-key.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem<T>(key: StorageKeyEnum, data: T): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  getItem<T>(key: StorageKeyEnum): T | null {
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Erreur lors du parsing de la clé ${key} :`, error);
      return null;
    }
  }

  removeItem(key: StorageKeyEnum): void {
    localStorage.removeItem(key);
  }
}
