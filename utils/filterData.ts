import { Response, FilteredData } from '@/types'; // Adjust path as per your project structure

export function filterData(response: Response): FilteredData {
    if (!response?.data?.children) {
        throw new Error('Invalid API response format');
    }

    const data = response.data.children.map(child => child.data);
    const after = response.data.after;
    const before = response.data.before;

    return {
        data,
        after,
        before,
    };
}
