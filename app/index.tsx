import {  ActivityIndicator, Text, View } from "react-native";
import { useFetch } from "@/hooks/useFetch";
import Constants from 'expo-constants';

export default function Index() {
  const appName = Constants.expoConfig.name;
  
  const { posts, isLoading, isError, loadMore, isLoadingMore } = useFetch();

  let content;

  if (isLoading) {
    content = <ActivityIndicator size="large" />;
  } else if (isError) {
    content = <Text className="text-white">Error fetching data.</Text>;
  } else if (!posts || posts.length === 0) {
    content = <Text className="text-white">No data available.</Text>;
  } else {
    content =  JSON.stringify(posts);
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold">{content}</Text>
    </View>
  );
}
