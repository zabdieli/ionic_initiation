import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTodoRequest, CreateTodoResponse, Todo, UpdateTodoRequest } from '../interface/todo-interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.baseURL}todos/`);
  }


  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${environment.baseURL}todos/${id}`);
  }

  
  createTodo(todo: CreateTodoRequest): Observable<CreateTodoResponse> {
    return this.http.post<CreateTodoResponse>(`${environment.baseURL}todos/`, todo);
  }

 
  updateTodo(id: number, todo: UpdateTodoRequest): Observable<Todo> {
    return this.http.put<Todo>(`${environment.baseURL}todos/${id}`, todo);
  }

 
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseURL}todos/${id}`);
  }
}
