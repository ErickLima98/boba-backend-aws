export class PaginatedResponse<Type> {
  constructor(
    results: Type[],
    total: number,
    limit: number | string,
    current_page: number,
    total_pages: number,
  ) {
    this.results = results;
    this.total = total;
    this.limit = limit;
    this.current_page = current_page;
    this.total_pages = total_pages;
  }

  results: Type[];
  total: number;
  limit: number | string;
  current_page: number;
  total_pages: number;
}
