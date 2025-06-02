// Doan Vo Quoc Thai - CE170410

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { todoReducer, initialState, TodoState, TodoAction } from '../reducers/todoReducer';

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
