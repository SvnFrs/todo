// Doan Vo Quoc Thai - CE170410

import { View, Text, FlatList } from 'react-native';
import { useTodo } from '~/context/todoContext';
import { useTheme } from '~/context/themeContext';
import { TodoItem } from './TodoItem';
import { AddTodoForm } from './AddTodoForm';
import { Todo } from '~/reducers/todoReducer';

export function TodoList() {
  const { state } = useTodo();
  const { colors } = useTheme();

  const renderTodoItem = ({ item }: { item: Todo }) => <TodoItem todo={item} />;

  return (
    <View style={{ flex: 1 }}>
      {/* Add Todo Form at the top */}
      <AddTodoForm />

      {/* Header with task count */}
      <View style={{ marginBottom: 16, marginTop: 24 }}>
        <Text
          style={{
            marginBottom: 8,
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text,
          }}>
          My Tasks
        </Text>
        <Text style={{ color: colors.textSecondary }}>
          {state.todos.filter((todo) => !todo.completed).length} of {state.todos.length} tasks
          remaining
        </Text>
      </View>

      {/* Todo List or Empty State */}
      {state.todos.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: colors.textSecondary,
              lineHeight: 28,
            }}>
            No todos yet!{'\n'}Add your first todo above.
          </Text>
        </View>
      ) : (
        <FlatList
          data={state.todos}
          keyExtractor={(item) => item.id}
          renderItem={renderTodoItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
