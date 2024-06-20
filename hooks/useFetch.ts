import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { fetchData } from '@/utils/fetchData';
import { Response } from '@/types';
import Constants from 'expo-constants';

export function useFetch() {

    const API_URL = Constants.expoConfig.jokeditt.url;
    const { data: response, error } = useSWR<Response>(API_URL, fetchData);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [after, setAfter] = useState<string | null>(null);
    const [before, setBefore] = useState<string | null>(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        if (response) {
            setIsLoading(false);
            setIsError(false);
            setPosts(response.data);
            setAfter(response.after);
            setBefore(response.before);
        }
        if (error) {
            setIsLoading(false);
            setIsError(true);
        }
    }, [response, error]);


    
    const loadMore = async () => {
        if (!after) return;

        setIsLoadingMore(true);
        try {
            const updatedResponse = await fetchData({
                baseUrl: API_URL,
                queryParams: {
                    count: count + 25,
                    after: after
                }
            });

            setPosts((prevPosts) => [...prevPosts, ...updatedResponse.data]);
            setAfter(updatedResponse.after);
            setBefore(updatedResponse.before);
            setCount((prevCount) => prevCount + 25);

            await mutate(API_URL, { ...updatedResponse, posts: [...posts, ...updatedResponse.posts] }, false);
        } catch (error) {
            console.error('Error loading more data:', error);
            throw new Error('Error loading more data');
        } finally {
            setIsLoadingMore(false);
        }
    };

    return {
        posts,
        isLoading,
        isError,
        loadMore,
        isLoadingMore,
    };
}