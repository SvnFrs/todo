// Doan Vo Quoc Thai - CE170410

import '../global.css';

import { Stack } from 'expo-router';
import { TodoProvider } from '~/context/todoContext';
import { ThemeProvider, useTheme } from '~/context/themeContext';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

function RootNavigator() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <RootNavigator />
      </TodoProvider>
    </ThemeProvider>
  );
}
