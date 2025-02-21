import { useInfiniteQuery } from "@tanstack/react-query";
import { NewsApiGetArticlesParams, GetGuardianArticles } from "@/types";
import { client, NEWS_SOURCES, PAGE_SIZE } from "@/config";

const getGuardianArticles = async ({
  pageParam = 1,
}: NewsApiGetArticlesParams): Promise<GetGuardianArticles> => {
  const response = await client<GetGuardianArticles>({
    baseURL: NEWS_SOURCES.guardian.url,
    url: "/search",
    method: "GET",
    params: {
      "api-key": NEWS_SOURCES.guardian.apiKey,
      page: pageParam,
      q: "bitcoin", //Todo: Change this to a dynamic query
      pageSize: PAGE_SIZE,
    },
  });
  return response.data;
};

export const useGuardianArticles = () => {
  return useInfiniteQuery<GetGuardianArticles>({
    queryKey: ["guardian", "/search"],
    queryFn: ({ pageParam }) =>
      getGuardianArticles({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.response.total - allPages.length * PAGE_SIZE > 0
        ? allPages.length + 1
        : undefined,
  });
};
