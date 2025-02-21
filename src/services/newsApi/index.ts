import { useInfiniteQuery } from "@tanstack/react-query";
import { NewsApiGetArticlesParams, NewsApiGetArticlesResponse } from "@/types";
import { client, NEWS_SOURCES, PAGE_SIZE } from "@/config";

const getNewsApiArticles = async ({
  pageParam = 1,
}: NewsApiGetArticlesParams): Promise<NewsApiGetArticlesResponse> => {
  const response = await client<NewsApiGetArticlesResponse>({
    baseURL: NEWS_SOURCES.newsApi.url,
    url: "/v2/everything",
    method: "GET",
    params: {
      apiKey: NEWS_SOURCES.newsApi.apiKey,
      page: pageParam,
      q: "bitcoin", //Todo: Change this to a dynamic query
      pageSize: PAGE_SIZE,
    },
  });
  return response.data;
};

export const useNewsApiArticles = () => {
  return useInfiniteQuery<NewsApiGetArticlesResponse>({
    queryKey: ["apiNews"],
    queryFn: ({ pageParam }) =>
      getNewsApiArticles({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.totalResults - allPages.length * PAGE_SIZE > 0
        ? allPages.length + 1
        : undefined,
  });
};
