import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-list-app');
  protected readonly newTodo = signal('');
  protected readonly todos = signal(<string[]>[]);
  protected readonly isAddingTodo = signal(false); // similar to useState in React (Ex. const [isAddingTodo, setIsAddingTodo] = useState(false);)
  protected readonly isDone = signal(false);
  protected readonly selectedTodo = signal<string | null>(null);

  handleAdd() {
    if (this.isDone()) {
      return;
    }
    this.isAddingTodo.set(true);
  }

  handleClear() {
    if (this.isDone()) {
      return;
    }
    this.todos.set([]);
  }

  handleSubmit() {
    const todoText = this.newTodo();
    if (todoText.trim() !== ''){
      this.todos.update(todos => [...todos, todoText]);
      this.newTodo.set('');
      this.isAddingTodo.set(false);
    }
  }

  handleCancel() {
    this.newTodo.set('');
    this.isAddingTodo.set(false);
  }

  handleDelete(todo: string) {
    if (this.isAddingTodo()) {
      return;
    }
    this.selectedTodo.set(todo);
    this.isDone.set(true);
  }

  confirmDelete() {
    const todoToDelete = this.selectedTodo();
    if (todoToDelete === null) {
      return;
    }
    this.todos.update(todos => todos.filter(todo => todo !== todoToDelete));
    this.selectedTodo.set(null);
    this.isDone.set(false);
  }
  
  cancelDelete() {
    this.isDone.set(false);
    this.selectedTodo.set(null);
  }
}
