import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonToast, IonLoading, IonLabel, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
import { UserProfileResponse } from 'src/app/core/interface/login-interface';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,IonHeader,IonToolbar,IonTitle,IonContent,IonItem,IonInput,IonButton,IonToast,IonLoading,IonLabel,
  ],
})
export class ProfileEditPage implements OnInit {

 profileForm!: FormGroup;
  userData!: UserProfileResponse;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
    });

    this.loadProfile();
  }

  loadProfile() {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.userData = profile;
        this.profileForm.patchValue({
          nom: profile.nom || '',
          prenom: profile.prenom || ''
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil', error);
      }
    });
  }

  onSave() {
    if (this.profileForm.valid) {
      const updateData = {
        nom: this.profileForm.value.nom || '',
        prenom: this.profileForm.value.prenom || ''
      };
      this.userService.updateProfile(updateData).subscribe({
        next: (response) => {
          console.log('Profil mis à jour', response);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour', error);
        }
      });
    }
  }
}