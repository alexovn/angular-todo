import { Component, signal } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import uniqueId from '../../utils/uniqueId';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import type { TodoItem } from '../../interfaces/todo.interface';

@Component({
  selector: 'todo-app',
  imports: [TodoListComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todo = signal('')
  todos = signal<TodoItem[]>([])

  addTodo(todo: string) {
    const item = {
      id: uniqueId('todo-'),
      name: todo,
      completed: false,
      pinned: false
    }

    this.todos.update(todos => [...todos, item])
    this.todo.set('')
  }

  setTodos(items: TodoItem[]) {
    this.todos.set(items)
  }
}
