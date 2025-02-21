import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import axiosInstance from "../../api";
import { NEWS_SOURCES } from "../../api/constants";

interface Article {
  title: string;
  description: string;
  url: string;
}

interface GuardianResponse {
  articles: Article[];
  nextCursor: number;
}

const getGuardianArticles = async ({
  pageParam = 1,
}): Promise<GuardianResponse> => {
  const response = await axiosInstance({
    baseURL: NEWS_SOURCES.guardian.url,
    url: "/search",
    method: "GET",
    params: { apiKey: NEWS_SOURCES.guardian.apiKey, page: pageParam },
  });
  return response.data;
};

export const useNewsApiArticles = (): UseInfiniteQueryResult<
  GuardianResponse,
  unknown
> => {
  return useInfiniteQuery<GuardianResponse, unknown>({
    queryKey: ["guardian"],
    queryFn: getGuardianArticles,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
