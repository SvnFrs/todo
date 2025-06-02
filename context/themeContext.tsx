// Doan Vo Quoc Thai - CE170410

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeState {
  theme: Theme;
  isDark: boolean;
}

type ThemeAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_IS_DARK'; payload: boolean };

interface ThemeContextType {
  state: ThemeState;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  colors: ColorScheme;
}

interface ColorScheme {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  danger: string;
  success: string;
}

const lightColors: ColorScheme = {
  background: '#ffffff',
  surface: '#f8f9fa',
  text: '#1f2937',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  primary: '#3b82f6',
  danger: '#ef4444',
  success: '#10b981',
};

const darkColors: ColorScheme = {
  background: '#111827',
  surface: '#1f2937',
  text: '#f9fafb',
  textSecondary: '#9ca3af',
  border: '#374151',
  primary: '#60a5fa',
  danger: '#f87171',
  success: '#34d399',
};

const initialState: ThemeState = {
  theme: 'auto',
  isDark: false,
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_IS_DARK':
      return { ...state, isDark: action.payload };
    default:
      return state;
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    if (state.theme === 'auto') {
      dispatch({ type: 'SET_IS_DARK', payload: systemColorScheme === 'dark' });
    } else {
      dispatch({ type: 'SET_IS_DARK', payload: state.theme === 'dark' });
    }
  }, [state.theme, systemColorScheme]);

  const setTheme = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const toggleTheme = () => {
    if (state.theme === 'auto') {
      setTheme('light');
    } else if (state.theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('auto');
    }
  };

  const colors = state.isDark ? darkColors : lightColors;

  const value: ThemeContextType = {
    state,
    setTheme,
    toggleTheme,
    colors,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
