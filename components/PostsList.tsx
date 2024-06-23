import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
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
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id || index.toString()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      pagingEnabled={true}
      ListFooterComponent={isLoadingMore ? <ActivityIndicator size="small" /> : null}
    />
  );
};

export default PostsList;
