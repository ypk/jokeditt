import { Post } from "./Post";

export interface Response {
    kind: string;
    data: {
        after: string;
        dist: number;
        modhash: string;
        geo_filter: null | string;
        children: Array<{
            kind: string;
            data: Post;
        }>;
        before: string | null;
    };
}
