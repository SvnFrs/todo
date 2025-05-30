import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '~/context/themeContext';

export function ThemeToggleButton() {
  const { state, toggleTheme, colors } = useTheme();

  const getIconName = () => {
    switch (state.theme) {
      case 'light':
        return 'sun-o';
      case 'dark':
        return 'moon-o';
      case 'auto':
        return 'adjust';
      default:
        return 'adjust';
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        marginRight: 15,
        padding: 4,
      }}
      accessibilityLabel="Toggle theme"
      accessibilityHint="Switches between light, dark, and auto theme modes">
      <FontAwesome name={getIconName()} size={24} color={colors.text} />
    </TouchableOpacity>
  );
}
