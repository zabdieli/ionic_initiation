import { Component } from '@angular/core';
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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { addIcons } from "ionicons";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { Router, RouterModule } from "@angular/router";
import { StorageKeyEnum } from 'src/app/core/services/storage/storage-key.enum';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { LoginRequest } from 'src/app/core/interface/login-interface';
import { AuthentificationService } from 'src/app/core/services/authentification/authentification.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


export type Registration = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    FormsModule,
    IonIcon,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule
  ]
})
export class RegisterPage {
  protected registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
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

  public onRegister(): void {
    const registrationValue: Registration = this.registerForm.value as Registration;
    const registerRequest = {
      email: registrationValue.email,
      password: registrationValue.password,
      prenom: registrationValue.firstname,
      nom: registrationValue.lastname
    };
    this.authenticationService.register(registerRequest).subscribe({
        next: (response: any) => {
          console.log('Inscription réussie:', response);
          this.storageService.setItem(StorageKeyEnum.ACCESS_TOKEN, response.access_token);
            this.router.navigate(['/todos']);
        },
        error: (error: any) => {
          console.error('Erreur lors de l’inscription:', error);
        }
      });
      }
  }
