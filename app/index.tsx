import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useFetch } from '@/hooks/useFetch';
import PostsList from '@/components/PostsList';

const Index: React.FC = () => {
  const { posts, isLoading, isError, loadMore, isLoadingMore } = useFetch();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorHeading}>Error fetching data</Text>
        <Text style={styles.errorText}>Sorry, there was an error fetching the data. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PostsList
        posts={posts}
        loadMore={loadMore}
        isLoadingMore={isLoadingMore}
        isError={isError}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  errorHeading: {
    fontSize: 26,
    marginBottom: 20,
  },
  errorText: {
    marginHorizontal: 20,
  },
});

export default Index;
