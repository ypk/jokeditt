import { Stack } from "expo-router";
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorBoundary from "@/components/ErrorBoundary";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ErrorBoundary>
        <Stack>
          <Stack.Screen name="index" options={{
            headerShown: false
          }} />
        </Stack>
      </ErrorBoundary>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
