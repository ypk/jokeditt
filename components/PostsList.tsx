import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, View, Dimensions } from 'react-native';
import PostItem from '@/components/PostItem';
import { Post } from '@/types';

interface PostsListProps {
  posts: Post[];
  loadMore: () => void;
  isLoadingMore: boolean;
}

const PostsList: React.FC<PostsListProps> = ({ posts, loadMore, isLoadingMore }) => {

  const renderItem = ({ item }: { item: Post }) => {
      return (
        <View style={styles.postContainer}>
          <PostItem post={item} />
        </View>
      );
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.flatList}
      contentContainerStyle={styles.contentContainer}
      onEndReached={loadMore}
      onEndReachedThreshold={4}
      pagingEnabled={true}
      ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" /> : null}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  postContainer: {
    flex: 1,
    width: "100%",
    height: Dimensions.get("window").height
  }
});

export default PostsList;
