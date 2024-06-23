import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { TimeStamp as TimeStampProps } from '@/types';

const TimeStamp: React.FC<TimeStampProps> = ({ timestamp }) => {
    const timeAgo = formatDistanceToNow(new Date(timestamp * 1000), { addSuffix: true });
    return <Text style={styles.timeStamp}>{timeAgo}</Text>;
};

const styles = StyleSheet.create({
    timeStamp: {
        fontSize: 12,
        color: 'gray',
    },
});

export default TimeStamp;
