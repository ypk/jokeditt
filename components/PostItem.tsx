import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import TimeStamp from './TimeStamp';
import { Post } from '@/types';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { author, title, selftext, num_comments, ups, created } = post;

  return (
    <View style={styles.card}>
      
      <View style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.postBody}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.selftext}>{selftext}</Text>
        </ScrollView>
      </View>

      <LinearGradient
        colors={['#ffffff', '#e8e8e8']}
        style={styles.postFooter}
      >
        <View style={styles.postInfo}>
          <Text style={styles.author}>{author}</Text>
          <TimeStamp timestamp={created} />
        </View>
        <View style={styles.postStats}>
          <View style={styles.iconContainer}>
            <Ionicons name="heart-sharp" color="#f00" size={30} />
            <Text style={styles.iconText}>{ups}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="chatbox-ellipses-outline" color="#000" size={30} />
            <Text style={styles.iconText}>{num_comments}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollViewContainer: {
    minHeight: (Dimensions.get("screen").height - 75 ) /2,
    flex: 1,
    flexGrow: 1,
  },
  postBody: {
    flex: 1,
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 18,
  },
  selftext: {
    fontSize: 18,
    marginVertical: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    borderRadius: 8,
    height: 75
  },
  postInfo: {
    flexDirection: 'column',
  },
  postStats: {
    flexDirection: 'row',
  },
  author: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginHorizontal: 8,
    fontSize: 18,
  },
});

export default PostItem;
