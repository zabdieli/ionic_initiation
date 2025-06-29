import { inject, Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { StorageKeyEnum } from '../storage/storage-key.enum';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const token = storageService.getItem<string>(StorageKeyEnum.ACCESS_TOKEN);

  const isAuthEndpoint = req.url.includes('login') || req.url.includes('register');

  if (isAuthEndpoint) {
    
    return next(req);
  }

  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(req);
};
