import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoItem } from '../../types/todo';
import { STORAGE_KEY } from '../../constants/keys';

export const loadTodosFromStorage = async (): Promise<TodoItem[]> => {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveTodosToStorage = async (todos: TodoItem[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};
