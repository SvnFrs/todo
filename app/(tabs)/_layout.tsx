// Doan Vo Quoc Thai - CE170410

import { Tabs } from 'expo-router';
import { View } from 'react-native';

import { TabBarIcon } from '../../components/TabBarIcon';
import { ThemeToggleButton } from '../../components/ThemeToggleButton';
import { useTheme } from '~/context/themeContext';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Todo List',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemeToggleButton />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
