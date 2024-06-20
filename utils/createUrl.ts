import { FetchConfig } from "@/types";

export function createUrl(params: FetchConfig | string): string {
    if (typeof params === 'string') {
        return params;
    }

    const { baseUrl, queryParams } = params;
    let url = baseUrl;

    if (queryParams) {
        const params = new URLSearchParams(queryParams);
        url += `?${params.toString()}`;
    }

    return url;
}
