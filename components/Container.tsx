import { SafeAreaView } from 'react-native';
import { useTheme } from '~/context/themeContext';

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 24,
        backgroundColor: colors.background,
      }}>
      {children}
    </SafeAreaView>
  );
};
