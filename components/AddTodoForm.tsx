import { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTodo } from '~/context/todoContext';
import { useTheme } from '~/context/themeContext';

export function AddTodoForm() {
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { addTodo } = useTodo();
  const { colors } = useTheme();

  const handleSubmit = () => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      Alert.alert('Error', 'Please enter a todo item');
      return;
    }

    addTodo(trimmedText);
    setText('');
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setText('');
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <TouchableOpacity
        onPress={() => setIsExpanded(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 16,
          marginBottom: 8,
        }}>
        <FontAwesome
          name="plus-circle"
          size={24}
          color={colors.primary}
          style={{ marginRight: 12 }}
        />
        <Text style={{ color: colors.textSecondary, fontSize: 16 }}>Add a new todo...</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 8,
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: colors.text,
          marginBottom: 12,
        }}>
        Add New Todo
      </Text>

      <TextInput
        style={{
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
          padding: 12,
          fontSize: 16,
          color: colors.text,
          minHeight: 80,
          marginBottom: 12,
          textAlignVertical: 'top',
        }}
        placeholder="What needs to be done?"
        placeholderTextColor={colors.textSecondary}
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={3}
        autoFocus
        maxLength={200}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
        <TouchableOpacity
          onPress={handleCancel}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: colors.textSecondary,
          }}>
          <Text style={{ color: '#ffffff', fontWeight: '600' }}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: colors.primary,
          }}>
          <Text style={{ color: '#ffffff', fontWeight: '600' }}>Add Todo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
