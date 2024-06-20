import { Post } from '@/types';

export interface FilteredData {
    data: Post[];
    after?: string | null;
    before?: string | null;
}