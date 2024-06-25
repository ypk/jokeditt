import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { filterData, fetchData } from '@/utils';
import { Response } from '@/types';
import Constants from 'expo-constants';

export function useFetch() {
    const API_URL = Constants.expoConfig.jokeditt.url;
    const { data: response, error } = useSWR<Response>(API_URL, fetchData);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [after, setAfter] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        if (response) {
            setIsLoading(false);
            setIsError(false);
            const filteredResponse = filterData(response);
            setPosts(filteredResponse.data);
            setAfter(filteredResponse.after);
        }
        if (error) {
            setIsLoading(false);
            setIsError(true);
            console.error(`Initial fetch error: ${error.message} | ${error}`);
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

            const filteredUpdatedResponse = filterData(updatedResponse);
 
            setPosts((prevPosts) => [...prevPosts, ...filteredUpdatedResponse.data]);
            setAfter(filteredUpdatedResponse.after);
            setCount((prevCount) => prevCount + 25);
            try {
                await mutate(API_URL, { ...filteredUpdatedResponse, posts: [...posts, ...filteredUpdatedResponse.posts] }, false);
            } catch (mutateError) {
                console.error(`Error in mutate function | ${mutateError}`);
                throw new Error(`Failed to update posts | ${mutateError}`);
            } 
        } catch (error) {
            console.error(`Error loading more data | ${error}`);
            throw new Error(`Failed to load more data | ${error}`);
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
