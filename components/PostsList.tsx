import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import PostItem from '@/components/PostItem';
import { Post } from '@/types';

interface PostsListProps {
  posts: Post[];
  loadMore: () => void;
  isLoadingMore: boolean;
}

const PostsList: React.FC<PostsListProps> = ({ posts, loadMore, isLoadingMore }) => {

  const renderItem = ({ item }: { item: Post }) => <PostItem post={item} />;

  return (
    <FlatList
      style={styles.flatList} 
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      pagingEnabled={true}
      ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" /> : null}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingHorizontal: 8,
  },
});

export default PostsList;
