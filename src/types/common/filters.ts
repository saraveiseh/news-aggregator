export type FiltersType = {
  category: number;
  source: string;
  from?: string;
  to?: string;
  q: string;
};

export interface GetArticlesParams {
  pageParam: number;
  q?: string;
  category?: number;
  from?: string;
  to?: string;
}
