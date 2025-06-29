import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeyEnum } from '../storage/storage-key.enum';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsService {
  private router = inject(Router);
  private storageService = inject(StorageService);

 
  canActivate(): boolean | Promise<boolean> {
    const hasAccessToken = !!this.storageService.getItem<string>(StorageKeyEnum.ACCESS_TOKEN);

    if (!hasAccessToken) {
      
      return true;
    }


    this.router.navigate(['/todos']);
    return false;
  }
}
