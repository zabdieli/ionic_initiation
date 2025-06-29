export interface Todo {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly ownerId: number;
  readonly createdAt: string;
}

export interface CreateTodoRequest {
  title: string;
  description: string;
  completed: boolean;
}

export interface CreateTodoResponse {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}
