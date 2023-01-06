import { Todo } from "../../Domain/Models/Todo";

export interface TodoRepository {
  getTodos(): Promise<Todo[]>;
  createTodo(todo: Todo): Promise<Todo>;
}