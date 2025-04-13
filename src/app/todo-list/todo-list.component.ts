import { Component, input, output } from '@angular/core';
import type { TodoItem } from '../../interfaces/todo.interface';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todos = input<TodoItem[]>([])
  onSetTodos = output<TodoItem[]>()

  removeTodo(id: string) {
    const filteredTodos = this.todos().filter(todo => todo.id !== id)
    this.onSetTodos.emit(filteredTodos)
  }

  changeTodo(props: {id: string, value: string}) {
    const {id, value} = props
    const updatedTodos = this.todos().map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        name: value
      }
    })
    this.onSetTodos.emit(updatedTodos)
  }
}
