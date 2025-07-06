import { makeAutoObservable, runInAction } from 'mobx';
import { TodoItem } from '../types/todo';
import { loadTodosFromStorage, saveTodosToStorage } from '../utils/storage/todoStorage';

class TodoStore {
  todos: TodoItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadTodos();
  }

  async loadTodos() {
    const storedTodos = await loadTodosFromStorage();
    runInAction(() => {
      this.todos = storedTodos;
    });
  }

  async saveTodos() {
    await saveTodosToStorage(this.todos);
  }

  async addTodo(title: string) {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    this.todos.push(newTodo);
    await this.saveTodos();
  }

  async toggleTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.todos[index].completed = !this.todos[index].completed;
      this.todos = [...this.todos];
      await this.saveTodos();
    }
  }

  async editTodo(id: string, title: string) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.todos[index].title = title;
      this.todos = [...this.todos];
      await this.saveTodos();
    }
  }

  async deleteTodo(id: string) {
    this.todos = this.todos.filter(t => t.id !== id);
    await this.saveTodos();
  }
}

const todoStore = new TodoStore();
export default todoStore;
