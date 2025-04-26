import { Component, ElementRef, input, output, signal, viewChild, effect } from '@angular/core';
import type { TodoItem } from '../../interfaces/todo.interface';

@Component({
  selector: 'todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  todo = input<TodoItem>()
  editor = viewChild<ElementRef>('editor')
  isEdit = signal(false)

  onTodoRemove = output<string>()
  onTodoChange = output<{ id: string, value: string }>()
  onTodoComplete = output<{ id: string, completed: boolean }>()
  onTodoPin = output<{ id: string, pinned: boolean }>()

  constructor() {
    effect(() => {
      if (this.editor()?.nativeElement && this.isEdit()) {
        this.editor()?.nativeElement.focus()
      }
    })
  }

  removeTodo() {
    const itemId = this.todo()?.id ?? '';
    this.onTodoRemove.emit(itemId);
  }

  editTodo(value: boolean) {
    this.isEdit.set(value)
  }

  changeTodo(event: Event) {
    const itemId = this.todo()?.id ?? ''
    this.onTodoChange.emit({
      id: itemId,
      value: (event.target as HTMLInputElement).value ?? ''
    })
  }

  completeTodo(event: Event) {
    const itemId = this.todo()?.id ?? ''
    this.onTodoComplete.emit({
      id: itemId,
      completed: (event.target as HTMLInputElement).checked ?? false
    })
  }

  pinTodo(event: Event) {
    const itemId = this.todo()?.id ?? ''
    this.onTodoPin.emit({
      id: itemId,
      pinned: (event.target as HTMLInputElement).checked ?? false
    })
  }

  onEditorBlur() {
    this.editTodo(false)
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.editTodo(false)
    }
  }
}
