import { PaginationResult } from './pagination.results';

export class Pagination<PaginationEntity> {
    public result: PaginationEntity[];
    public pageTotal: number;
    public total: number;

    constructor(paginationResult: PaginationResult<PaginationEntity>) {
        this.result = paginationResult.results;
        this.pageTotal = paginationResult.results.length;
        this.total = paginationResult.total;
    }
}
