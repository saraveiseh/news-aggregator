import { useInfiniteQuery } from "@tanstack/react-query";
import { GetNYTArticles, NYTGetArticlesParams } from "@/types";
import { client, NEWS_SOURCES, PAGE_SIZE } from "@/config";

const getNYTArticles = async ({
  pageParam = 1,
}: NYTGetArticlesParams): Promise<GetNYTArticles> => {
  const response = await client<GetNYTArticles>({
    baseURL: NEWS_SOURCES.nyt.url,
    url: "/svc/search/v2/articlesearch.json",
    method: "GET",
    params: {
      "api-key": NEWS_SOURCES.nyt.apiKey,
      page: pageParam,
      q: "bitcoin", //Todo: Change this to a dynamic query
    },
  });
  return response.data;
};

export const useNYTArticles = () => {
  return useInfiniteQuery<GetNYTArticles>({
    queryKey: ["NYT", "/svc/search/v2/articlesearch.json"],
    queryFn: ({ pageParam }) =>
      getNYTArticles({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.response.meta.hits - allPages.length * PAGE_SIZE > 0
        ? allPages.length + 1
        : undefined,
  });
};
