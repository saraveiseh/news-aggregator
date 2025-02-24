import { useInfiniteQuery } from "@tanstack/react-query";
import {
  FiltersType,
  GetArticlesParams,
  NewsApiGetArticlesResponse,
} from "@/types";
import { CATEGORIES, client, NEWS_SOURCES, PAGE_SIZE } from "@/config";

const getNewsApiArticles = async ({
  pageParam = 1,
  q,
  category,
  from,
  to,
}: GetArticlesParams): Promise<NewsApiGetArticlesResponse> => {
  const response = await client<NewsApiGetArticlesResponse>({
    baseURL: NEWS_SOURCES.newsApi.url,
    url: "/v2/everything",
    method: "GET",
    params: {
      apiKey: NEWS_SOURCES.newsApi.apiKey,
      page: pageParam,
      q:
        q ||
        CATEGORIES.find((item) => item.id === Number(category))?.sources
          .newsApi,
      pageSize: PAGE_SIZE,
      from: from,
      to: to,
    },
  });
  return response.data;
};

export const useNewsApiArticles = ({ params }: { params: FiltersType }) => {
  return useInfiniteQuery<NewsApiGetArticlesResponse>({
    queryKey: ["apiNews", "/v2/everything"],
    enabled: params.source === "newsApi" || params.source === "all",
    queryFn: ({ pageParam }) =>
      getNewsApiArticles({ pageParam: pageParam as number, ...params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.totalResults - allPages.length * PAGE_SIZE > 0
        ? allPages.length + 1
        : undefined,
  });
};
