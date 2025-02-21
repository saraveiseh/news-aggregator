import { ArticlesList, SpinnerObserver } from "@/components/containers";
import { useNewsApiArticles } from "@/services";

export const HomePageContainer = () => {
  const { data, hasNextPage, fetchNextPage } = useNewsApiArticles();

  const flatList = data?.pages.flatMap((page) => page.articles);

  const list = flatList?.map((article) => ({
    title: article.title,
    description: article.description || article.content,
    date: article.publishedAt,
    author: article.author,
    image: article.urlToImage,
  }));

  return (
    <div>
      <ArticlesList articles={list || []} />
      {hasNextPage && <SpinnerObserver onIntersect={() => fetchNextPage()} />}
    </div>
  );
};
