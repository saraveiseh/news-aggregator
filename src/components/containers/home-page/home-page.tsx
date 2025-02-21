import { ArticlesList, SpinnerObserver } from "@/components/containers";
import {
  useGuardianArticles,
  useNewsApiArticles,
  useNYTArticles,
} from "@/services";

export const HomePageContainer = () => {
  const {
    data: newsApiData,
    hasNextPage: newsApiHasNextPage,
    fetchNextPage: newsApiFetchNextPage,
  } = useNewsApiArticles();
  const {
    data: nytData,
    hasNextPage: nytHasNextPage,
    fetchNextPage: nytFetchNextPage,
  } = useNYTArticles();

  const {
    data: guardianData,
    hasNextPage: guardianHasNextPage,
    fetchNextPage: guardianFetchNextPage,
  } = useGuardianArticles();

  const newsApiFlatList = newsApiData?.pages.flatMap((page) => page.articles);

  const newsApiList = newsApiFlatList?.map((article) => ({
    title: article.title,
    description: article.description || article.content,
    date: article.publishedAt,
    author: article.author,
    image: article.urlToImage,
  }));

  const nytFlatList = nytData?.pages.flatMap((page) => page.response.docs);

  const nytList = nytFlatList?.map((doc) => ({
    title: doc.headline.main,
    description: doc.abstract || doc.snippet,
    date: doc.pub_date,
    author: doc.byline.original || "",
    image: `https://static01.nyt.com/${doc.multimedia[0].url}`,
  }));

  const guardianFlatList = guardianData?.pages.flatMap(
    (page) => page.response.results
  );

  const guardianList = guardianFlatList?.map((article) => ({
    title: article.webTitle,
    description: article.webTitle,
    date: article.webPublicationDate,
  }));

  return (
    <div>
      <ArticlesList articles={guardianList || []} />
      {guardianHasNextPage && (
        <SpinnerObserver onIntersect={() => guardianFetchNextPage()} />
      )}
    </div>
  );
};
