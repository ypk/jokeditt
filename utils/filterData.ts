import { Response, FilteredData } from '@/types';

export function filterData(response: Response): FilteredData {
    if (!response || !response.data || !response.data.children || !Array.isArray(response.data.children)) {
        throw new Error('Invalid API response format');
    }

    const data = response.data.children.map(child => child.data);
    const after = response.data.after || null;
    const before = response.data.before || null;

    return {
        data,
        after,
        before,
    };
}
