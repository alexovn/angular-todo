import { Component, signal, computed } from '@angular/core';
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
  activeFilter = signal<'All' | 'Active' | 'Completed'>('All')

  filteredTodos = computed(() => {
    if (this.activeFilter() === 'All') {
      return this.todos()
    }
    if (this.activeFilter() === 'Active') {
      return this.todos().filter(todo => !todo.completed)
    }
    if (this.activeFilter() === 'Completed') {
      return this.todos().filter(todo => todo.completed)
    }
    return []
  })

  filters = computed(() => ([
    {
      label: 'All',
      active: this.activeFilter() === 'All',
      click: () => this.activeFilter.set('All')
    },
    {
      label: 'Active',
      active: this.activeFilter() === 'Active',
      click: () => this.activeFilter.set('Active')
    },
    {
      label: 'Completed',
      active: this.activeFilter() === 'Completed',
      click: () => this.activeFilter.set('Completed')
    }
  ]))

  filteredSentence = computed(() => {
    return `${this.filteredTodos().length} ${this.filteredTodos().length === 1 ? 'item' : 'items'} left`
  })

  ngOnInit() {
    const _todos = localStorage.getItem('todos')

    if (_todos) {
      const todos = JSON.parse(_todos)
      this.todos.set(todos)
    } else {
      const defaultTodo = {
        id: 'todo-0',
        name: 'Walk with a dog 🐕',
        completed: false,
        pinned: false,
      }
      this.todos.set([defaultTodo])
    }
  }

  setTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos()))
  }

  addTodo() {
    const item = {
      id: uniqueId('todo-'),
      name: this.todo(),
      completed: false,
      pinned: false
    }

    this.todos.update(todos => [...todos, item])
    this.todo.set('')
    this.setTodosToLocalStorage()
  }

  setTodos(items: TodoItem[]) {
    this.todos.set(items)
    this.setTodosToLocalStorage()
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.addTodo()
    }
  }
}
