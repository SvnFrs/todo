import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { useTheme } from '~/context/themeContext';

type ButtonProps = {
  title: string;
  primary?: boolean;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, primary = false, ...touchableProps }, ref) => {
    const { colors } = useTheme();

    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        style={{
          alignItems: 'center',
          backgroundColor: primary ? colors.primary : colors.textSecondary,
          borderRadius: 28,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          padding: 16,
          ...(touchableProps.style as any),
        }}>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
