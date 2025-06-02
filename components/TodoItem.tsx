// Doan Vo Quoc Thai - CE170410

import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Todo } from '~/reducers/todoReducer';
import { useTodo } from '~/context/todoContext';
import { useTheme } from '~/context/themeContext';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodo();
  const { colors } = useTheme();

  return (
    <View
      style={{
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}>
      <TouchableOpacity
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
        onPress={() => toggleTodo(todo.id)}>
        <FontAwesome
          name={todo.completed ? 'check-circle' : 'circle-o'}
          size={24}
          color={todo.completed ? colors.success : colors.textSecondary}
          style={{ marginRight: 12 }}
        />
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            color: todo.completed ? colors.textSecondary : colors.text,
            textDecorationLine: todo.completed ? 'line-through' : 'none',
          }}>
          {todo.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteTodo(todo.id)} style={{ padding: 8 }}>
        <FontAwesome name="trash" size={20} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
}
