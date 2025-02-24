import useLocalStorage from "@/hooks/useLocalStorage";
import {
  useGuardianArticles,
  useNewsApiArticles,
  useNYTArticles,
} from "@/services";
import { FiltersType } from "@/types";
import { DateFormatter } from "@/utils";
import { useEffect, useState } from "react";

export const useArticles = () => {
  const [savedFilters, setSaveFilters] = useLocalStorage<FiltersType>(
    "filters",
    {
      q: "",
      source: "all",
      category: 1,
      from: "",
      to: "",
    }
  );
  const [filters, setFilters] = useState<FiltersType>(savedFilters);

  const {
    data: newsApiData,
    hasNextPage: newsApiHasNextPage,
    fetchNextPage: newsApiFetchNextPage,
    refetch: newsApiRefetch,
    isRefetching: newsApiIsRefetching,
  } = useNewsApiArticles({ params: filters });

  const {
    data: nytData,
    hasNextPage: nytHasNextPage,
    fetchNextPage: nytFetchNextPage,
    refetch: nytRefetch,
    isRefetching: nytIsRefetching,
  } = useNYTArticles({ params: filters });

  const {
    data: guardianData,
    hasNextPage: guardianHasNextPage,
    fetchNextPage: guardianFetchNextPage,
    refetch: guardianRefetch,
    isRefetching: guardianIsRefetching,
  } = useGuardianArticles({ params: filters });

  const newsApiFlatList = newsApiData?.pages.flatMap((page) => page.articles);

  const newsApiList = newsApiFlatList?.map((article) => ({
    title: article.title,
    description: article.description || article.content,
    date: DateFormatter(article.publishedAt),
    author: article.author,
    image: article.urlToImage,
    url: article.url,
  }));

  const nytFlatList = nytData?.pages.flatMap((page) => page.response.docs);

  const nytList = nytFlatList?.map((doc) => ({
    title: doc.headline.main,
    description: doc.abstract || doc.snippet,
    date: DateFormatter(doc.pub_date),
    author: doc.byline.original || "",
    image: `https://static01.nyt.com/${doc.multimedia[0].url}`,
    url: doc.web_url,
  }));

  const guardianFlatList = guardianData?.pages.flatMap(
    (page) => page.response.results
  );

  const guardianList = guardianFlatList?.map((article) => ({
    title: article.webTitle,
    description: article.webTitle,
    date: DateFormatter(article.webPublicationDate),
    url: article.webUrl,
  }));

  const handleGetMoreArticles = () => {
    switch (filters.source) {
      case "newsApi": {
        newsApiFetchNextPage();
        break;
      }
      case "nyt": {
        nytFetchNextPage();
        break;
      }
      case "guardian": {
        guardianFetchNextPage();
        break;
      }
      case "all": {
        newsApiFetchNextPage();
        nytFetchNextPage();
        guardianFetchNextPage();
        break;
      }
    }
  };

  const handleGeneralList = () => {
    switch (filters.source) {
      case "newsApi":
        return newsApiList;
      case "nyt":
        return nytList;
      case "guardian":
        return guardianList;
      case "all":
        return [
          ...(newsApiList || []),
          ...(nytList || []),
          ...(guardianList || []),
        ];
    }
  };

  const handleRefetchArticles = () => {
    switch (filters.source) {
      case "newsApi":
        newsApiRefetch();
        break;
      case "nyt": {
        nytRefetch();
        break;
      }
      case "guardian": {
        guardianRefetch();
        break;
      }
      case "all": {
        newsApiRefetch();
        nytRefetch();
        guardianRefetch();
        break;
      }
    }
  };

  const handleHasNextPage = () => {
    switch (filters.source) {
      case "newsApi": {
        return newsApiHasNextPage;
      }
      case "nyt": {
        return nytHasNextPage;
      }
      case "guardian": {
        return guardianHasNextPage;
      }
      case "all": {
        return newsApiHasNextPage || nytHasNextPage || guardianHasNextPage;
      }
    }
  };

  const handleIsRefetching = () => {
    switch (filters.source) {
      case "newsApi": {
        return newsApiIsRefetching;
      }
      case "nyt": {
        return nytIsRefetching;
      }
      case "guardian": {
        return guardianIsRefetching;
      }
      case "all": {
        return newsApiIsRefetching || nytIsRefetching || guardianIsRefetching;
      }
    }
  };

  useEffect(() => {
    handleRefetchArticles();
    setSaveFilters(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return {
    filters,
    setFilters,
    isRefetching: handleIsRefetching(),
    generalList: handleGeneralList() || [],
    hasNextPage: handleHasNextPage(),
    handleGetMoreArticles,
  };
};
