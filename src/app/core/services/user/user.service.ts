import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserProfileResponse } from '../../interface/login-interface';


export interface UpdateProfileRequest {
  nom?: string;
  prenom?: string;
  email?: string;
}



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getProfile(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(`${environment.baseURL}user/profile`);
  }

  updateProfile(data: { nom: string; prenom: string }): Observable<UserProfileResponse> {
    return this.http.put<UserProfileResponse>(`${environment.baseURL}user/profile`, data);
  }

}