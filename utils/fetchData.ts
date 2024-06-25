// utils/fetchData.ts
import { createUrl } from './createUrl';
import { FetchConfig, Response } from '@/types';

export async function fetchData(fetchParams: FetchConfig | string): Promise<Response> {
    let url: string;

    if (typeof fetchParams === 'string') {
        url = fetchParams;
    } else {
        url = createUrl(fetchParams as FetchConfig);
    }

    try {
        const fetchResponse = await fetch(url);

        if (!fetchResponse.ok) {
            throw new Error(`HTTP Error | Status: ${fetchResponse.status}`);
        }

        const contentType = fetchResponse.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            return fetchResponse.json();
        } else {
            const responseBlob = await fetchResponse.blob();
            const reader = new FileReader();
            reader.readAsText(responseBlob);
            
            return new Promise<Response>((resolve, reject) => {
                reader.onload = () => {
                    try {
                        resolve(JSON.parse(reader.result as string));
                    } catch (e) {
                        reject(e);
                    }
                };

                reader.onerror = (e) => reject(e);
            });
        }

    } catch (error) {
        console.error(`Fetch error at URL: ${url} | Error: ${error.message}`);
        throw new Error(`Failed to fetch data from ${url} | ${error.message}`);
    }
}
