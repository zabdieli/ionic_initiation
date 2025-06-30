import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoServiceService } from 'src/app/core/todo/todo-service.service';
import { CreateTodoRequest } from 'src/app/core/interface/todo-interface';
import {  IonInput, IonButton,IonCheckbox,IonContent,IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,IonItem,
 
  IonLabel, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
  standalone: true,
  imports: [IonToolbar,IonItem, IonIcon, ReactiveFormsModule,IonContent,IonHeader,IonTitle,IonInput,IonButton,IonCheckbox,IonLabel, CommonModule, IonButtons,IonBackButton,
  ]
})
export class CreateTodoPage implements OnInit {

  createTodoForm!: FormGroup;

  private todoService = inject(TodoServiceService);
  private router = inject(Router);

  ngOnInit(): void {
    this.createTodoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      completed: new FormControl(false)
    });
  }

  onCreateTodo(): void {
    if (this.createTodoForm.valid) {
      const todoData: CreateTodoRequest = this.createTodoForm.value as CreateTodoRequest;

      this.todoService.createTodo(todoData).subscribe({
        next: () => {
          console.log('Todo bien créé');
          this.router.navigate(['/todos']);
        },
        error: (error) => {
          console.error('Attention il y a une erreur:', error);
        }
      });
    }
  }
}
