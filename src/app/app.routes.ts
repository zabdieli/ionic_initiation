import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  
  {
    path: 'todos',
    loadComponent: () => import('./pages/todos/todos.page').then( m => m.TodosPage)
  },
  {
  path: 'profile-edit',
  loadComponent: () => import('./pages/profile-edit/profile-edit.page').then(m => m.ProfileEditPage)
  },
  {
    path: 'create-todo',
    loadComponent: () => import('./pages/todos/create-todo/create-todo.page').then( m => m.CreateTodoPage)
  },
  {
    path: 'edit-todo/:id',
    loadComponent: () => import('./pages/todos/edit-todo/edit-todo.page').then( m => m.EditTodoPage)
  },
];
