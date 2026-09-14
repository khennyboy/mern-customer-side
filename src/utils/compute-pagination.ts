import type { Pagination } from "./types";

export const computePagination = (
    page: number,
    totalProducts: number,
    pageSize: number,
): Pagination => {
    const totalPages = Math.max(Math.ceil(totalProducts / pageSize), 1);
    return {
        pageSize,
        totalProducts,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
    };
};