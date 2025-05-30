import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { TodoList } from '~/components/TodoList';
import { Container } from '~/components/Container';
import { useTheme } from '~/context/themeContext';

export default function Home() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Todo List' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Container>
          <TodoList />
        </Container>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
