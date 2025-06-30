import { Component, inject, OnInit, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonBackButton, IonCardHeader,IonHeader, IonItem, IonCardTitle, IonToolbar, IonCard,IonCardContent,IonContent,IonLabel,IonTitle,IonIcon, IonButton,IonButtons,IonText, IonList, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { HttpErrorResponse } from "@angular/common/http";
import { addIcons } from "ionicons";
import { Router } from "@angular/router";
import { createOutline, trashBinOutline, logOutOutline } from "ionicons/icons"; 
import { StorageService } from "../../core/services/storage/storage.service";
import { TodoServiceService } from 'src/app/core/todo/todo-service.service';
import { Todo } from 'src/app/core/interface/todo-interface';
import { StorageKeyEnum } from 'src/app/core/services/storage/storage-key.enum';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
  standalone: true,
  imports: [IonItemOption, IonItemOptions, IonItemSliding, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonLabel,
    IonText, IonBackButton, IonItem, IonIcon, IonButton, IonButtons,
    
    
  ]
})
export class TodosPage implements OnInit {
  protected todos: Todo[] = [];

  
  private readonly todoService = inject(TodoServiceService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);
  trackByTodoId!: TrackByFunction<Todo>;

  constructor() {
    addIcons({ createOutline, trashBinOutline, logOutOutline }); 
  }

  ngOnInit() {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (todos: Todo[]) => {
        this.todos = todos;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Problème de chargement des todo:', error);
      }
    });
  }

  createTodo(): void {
    console.log('Créer todo');
    this.router.navigate(['/create-todo']);
  }

  editTodo(todo: Todo): void {
    console.log('Tu modifies le todo bg:', todo);
    this.router.navigate(['/edit-todo', todo.id]); 
  }

  deleteTodo(todo: Todo): void {
    console.log('Tu supprimes le todo:', todo);
    if (confirm(`Supprimer la tâche "${todo.title}" ?`)) {
      this.todoService.deleteTodo(todo.id).subscribe({
        next: () => {
          this.todos = this.todos.filter(t => t.id !== todo.id);
          console.log('Todo supprimé');
        },
        error: (error: HttpErrorResponse) => {
          console.error('Problème de suppression todo:', error);
          alert('Erreur de todo de suppression.');
        }
      });
    }
  }

  logout(): void {
    if (confirm('Se déconnecter ?')) {
      this.storageService.removeItem(StorageKeyEnum.ACCESS_TOKEN);
      this.router.navigate(['/login']);
      console.log('Déconnecté');
    }
  }
}
