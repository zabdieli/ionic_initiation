import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { Router } from "@angular/router";
import { addIcons } from "ionicons";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { Registration } from "../register/register.page";
import { StorageKeyEnum } from 'src/app/core/services/storage/storage-key.enum';
import { LoginRequest } from 'src/app/core/interface/login-interface';
import { LoginResponse } from 'src/app/core/interface/login-interface';
import { AuthentificationService } from 'src/app/core/services/authentification/authentification.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

export type Login = {
  email: string;
  password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonInput, IonItem, ReactiveFormsModule]
})
export class LoginPage {
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  protected typeOfPasswordInput = 'password';
  protected iconOfPasswordInput = 'eye-outline';

  constructor(private router: Router,
              private authenticationService: AuthentificationService,
              private storageService: StorageService
  ) {
    addIcons({eyeOutline, eyeOffOutline});
  }

  public onTogglePasswordVisibility() {
    if (this.typeOfPasswordInput === 'password') {
      this.iconOfPasswordInput = 'eye-off-outline';
      this.typeOfPasswordInput = 'text';
    } else {
      this.iconOfPasswordInput = 'eye-outline';
      this.typeOfPasswordInput = 'password';
    }
  }

  public onLogin(): void {
  const loginValue: LoginRequest = this.loginForm.value as LoginRequest;

  this.authenticationService.login(loginValue).subscribe({
    next: (response: any) => {
          console.log('Connexion réussie:', response);
          this.storageService.setItem(StorageKeyEnum.ACCESS_TOKEN, response.access_token);
            this.router.navigate(['/todos']);
        },
        error: (error: any) => {
          console.error('Erreur lors de la connexion:', error);
        }
      });
}

}
