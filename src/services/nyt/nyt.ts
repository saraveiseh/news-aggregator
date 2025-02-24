import { useInfiniteQuery } from "@tanstack/react-query";
import { FiltersType, GetNYTArticles, GetArticlesParams } from "@/types";
import { CATEGORIES, client, NEWS_SOURCES, PAGE_SIZE } from "@/config";

const generateSearchQuery = (category: string, from: string): string => {
  if (from.length > 0)
    return `section_name:("${category}") AND pub_date:("${from}")`;
  else return `section_name:("${category}")`;
};

const getNYTArticles = async ({
  pageParam = 0,
  q,
  category,
  from,
}: GetArticlesParams): Promise<GetNYTArticles> => {
  const response = await client<GetNYTArticles>({
    baseURL: NEWS_SOURCES.nyt.url,
    url: "/svc/search/v2/articlesearch.json",
    method: "GET",
    params: {
      "api-key": NEWS_SOURCES.nyt.apiKey,
      page: pageParam,
      q: q,
      fq: generateSearchQuery(
        CATEGORIES.find((item) => item.id === Number(category))?.sources
          .nyt as string,
        from as string
      ),
    },
  });
  return response.data;
};

export const useNYTArticles = ({ params }: { params: FiltersType }) => {
  return useInfiniteQuery<GetNYTArticles>({
    queryKey: ["NYT", "/svc/search/v2/articlesearch.json"],
    enabled: params.source === "nyt" || params.source === "all",
    queryFn: ({ pageParam }) =>
      getNYTArticles({ pageParam: pageParam as number, ...params }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.response.meta.hits - allPages.length * PAGE_SIZE > 0
        ? allPages.length + 1
        : undefined,
  });
};
