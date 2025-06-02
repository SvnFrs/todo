// Doan Vo Quoc Thai - CE170410

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '~/reducers/todoReducer';

const TODOS_STORAGE_KEY = '@todos';

export const todoStorage = {
  async saveTodos(todos: Todo[]): Promise<void> {
    try {
      const todosJson = JSON.stringify(todos);
      await AsyncStorage.setItem(TODOS_STORAGE_KEY, todosJson);
    } catch (error) {
      console.error('Error saving todos to AsyncStorage:', error);
      throw error;
    }
  },

  async loadTodos(): Promise<Todo[]> {
    try {
      const todosJson = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
      if (todosJson === null) {
        return [];
      }

      const todos = JSON.parse(todosJson);
      // Convert createdAt strings back to Date objects
      return todos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
    } catch (error) {
      console.error('Error loading todos from AsyncStorage:', error);
      return [];
    }
  },

  async clearTodos(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TODOS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing todos from AsyncStorage:', error);
      throw error;
    }
  },
};
