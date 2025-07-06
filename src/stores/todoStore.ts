import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoItem } from '../types/todo';

const STORAGE_KEY = 'TODO_STORE';

class TodoStore {
  todos: TodoItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadTodos(); // Load from AsyncStorage on startup
  }

  async loadTodos() {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      runInAction(() => {
        this.todos = parsed;
      });
    }
  }

  async saveTodos() {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
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
      this.todos = [...this.todos]; // Trigger update
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
