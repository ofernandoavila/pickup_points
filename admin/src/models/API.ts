export interface APIResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface Pagination<T> {
    page: number;
    perPage: number;
    totalPages: number;
    data: T[];
}

export interface PaginationFilter {
    page: number;
    perPage: number;
}