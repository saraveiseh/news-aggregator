import { useInfiniteQuery } from "@tanstack/react-query";
import { GetArticlesParams, GetGuardianArticles, FiltersType } from "@/types";
import { CATEGORIES, client, NEWS_SOURCES, PAGE_SIZE } from "@/config";

const getGuardianArticles = async ({
  pageParam = 1,
  q,
  category,
  from,
  to,
}: GetArticlesParams): Promise<GetGuardianArticles> => {
  const response = await client<GetGuardianArticles>({
    baseURL: NEWS_SOURCES.guardian.url,
    url: "/search",
    method: "GET",
    params: {
      "api-key": NEWS_SOURCES.guardian.apiKey,
      page: pageParam,
      q: q,
      section: CATEGORIES.find((item) => item.id === Number(category))?.sources
        .guardian,
      pageSize: PAGE_SIZE,
      "from-date": from,
      "to-date": to,
    },
  });
  return response.data;
};

export const useGuardianArticles = ({ params }: { params: FiltersType }) => {
  return useInfiniteQuery<GetGuardianArticles>({
    queryKey: ["guardian", "/search"],
    enabled: params.source === "guardian" || params.source === "all",
    queryFn: ({ pageParam }) =>
      getGuardianArticles({ pageParam: pageParam as number, ...params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.response.total - allPages.length * PAGE_SIZE > 0
        ? allPages.length + 1
        : undefined,
  });
};
