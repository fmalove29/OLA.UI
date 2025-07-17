export interface PagedResponse<T> {
    data: T[];
    meta: {
        total: number;
        limit: number;
        page: number;
        lastPage: number;
    };
}