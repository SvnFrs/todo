// Doan Vo Quoc Thai - CE170410

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { todoReducer, initialState, TodoState, TodoAction } from '../reducers/todoReducer';
import { todoStorage } from '~/services/todoStorage';

interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load todos from AsyncStorage when the app starts
  useEffect(() => {
    const loadTodos = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: { isLoading: true } });
        const savedTodos = await todoStorage.loadTodos();
        dispatch({ type: 'LOAD_TODOS', payload: { todos: savedTodos } });
      } catch (error) {
        console.error('Failed to load todos:', error);
        dispatch({ type: 'SET_LOADING', payload: { isLoading: false } });
      }
    };

    loadTodos();
  }, []);

  // Save todos to AsyncStorage whenever todos change
  useEffect(() => {
    const saveTodos = async () => {
      if (!state.isLoading && state.todos.length >= 0) {
        try {
          await todoStorage.saveTodos(state.todos);
        } catch (error) {
          console.error('Failed to save todos:', error);
        }
      }
    };

    saveTodos();
  }, [state.todos, state.isLoading]);

  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', payload: { text } });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  };

  const value: TodoContextType = {
    state,
    dispatch,
    addTodo,
    toggleTodo,
    deleteTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}
