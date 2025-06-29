import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest, RegisterResponse } from '../../interface/register-interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LoginRequest, LoginResponse } from '../../interface/login-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService{

  constructor(private http: HttpClient) {}

  
  register(registrationPayload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.baseURL}register`, registrationPayload);
  }

  login(loginPayload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.baseURL}login`, loginPayload);
  }
}