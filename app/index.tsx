import { Text, View } from "react-native";
import Constants from 'expo-constants';

export default function Index() {
  const appName = Constants.expoConfig.name;
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold">Welcome to {appName}</Text>
    </View>
  );
}
