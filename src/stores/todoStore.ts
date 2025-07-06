import { makeAutoObservable, runInAction } from 'mobx';
import { TodoItem } from '../types/todo';
import { loadTodosFromStorage, saveTodosToStorage } from '../utils/storage/todoStorage';
import { Alert } from 'react-native';

import { GEMINI_API_KEY } from '../constants/keys';

class TodoStore {
  todos: TodoItem[] = [];
  aiPlan: string = '';
  loadingPlan: boolean = false;

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


  async generatePlan() {
    this.loadingPlan = true;
    this.aiPlan = '';
    
const taskList = Array.isArray(this.todos)
  ? this.todos
      .filter(t => !t.completed)
      .map(t => `- ${t?.title ?? '[Untitled Task]'}`)
      .join('\n')
  : 'No tasks found';

const prompt = `Here's a list of tasks:\n${taskList || 'No tasks found'}\n\nGenerate a smart, organized plan to complete these tasks today.`;


    try {
      Alert.alert('Generating Plan', 'Please wait while the AI generates your plan...');
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( { contents: [{ parts: [{ text: prompt }] }],}),
        }
      );
      const data = await response.json();
      runInAction(() => {
        this.aiPlan = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No plan generated.';
        this.loadingPlan = false;
      });
    } catch (error) {
      runInAction(() => {
        this.aiPlan = '⚠️ Failed to generate plan.';
        this.loadingPlan = false;
      });
    }
  }
}

const todoStore = new TodoStore();
export default todoStore;
