import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {IonLabel, IonButton,IonCheckbox,IonItem,IonInput,IonText,IonContent,IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,
  
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TodoServiceService } from 'src/app/core/todo/todo-service.service';
import { Todo, UpdateTodoRequest } from 'src/app/core/interface/todo-interface';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
  standalone: true,
  imports: [
    IonText,CommonModule,ReactiveFormsModule, IonContent,IonHeader,IonTitle,IonToolbar,IonItem,IonInput,IonButton,IonCheckbox,IonButtons,IonBackButton,
    IonLabel,
  ]
})
export class EditTodoPage implements OnInit {
  protected editTodoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    completed: new FormControl(false)
  });

  private route = inject(ActivatedRoute);
  private todoService = inject(TodoServiceService);
  private todoId: number = 0;
  private router = inject(Router);

  ngOnInit() {
    this.todoId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTodo();
  }

  private loadTodo(): void {
    this.todoService.getTodoById(this.todoId).subscribe({
      next: (todo: Todo) => {
        this.editTodoForm.patchValue({
          title: todo.title,
          description: todo.description,
          completed: todo.completed
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Bg Probkème du chargement du todo:', error);
        alert('Impossible de charger la tâche.');
      }
    });
  }

  public onSaveTodo(): void {
    if (this.editTodoForm.valid) {
      const updatedTodo: UpdateTodoRequest = this.editTodoForm.value as UpdateTodoRequest;
      this.todoService.updateTodo(this.todoId, updatedTodo).subscribe({
        next: () => {
          console.log('Le todo est à jour');
          this.router.navigate(['/todos']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Bg pas de mise à jour:', error);
          alert('Impossible de sauvegarder la tâche.');
        }
      });
    }
  }
}
