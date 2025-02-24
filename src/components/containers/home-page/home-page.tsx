import {
  ArticlesList,
  Filters,
  Header,
  SpinnerObserver,
} from "@/components/containers";
import { Loader } from "@/components/ui";
import { useArticles } from "@/hooks";

export const HomePageContainer = () => {
  const {
    filters,
    setFilters,
    isRefetching,
    generalList,
    hasNextPage,
    handleGetMoreArticles,
  } = useArticles();

  return (
    <>
      <div className="sm:sticky top-0 z-50 bg-white">
        <Header />
        <Filters filters={filters} setFilters={setFilters} />
      </div>
      {isRefetching ? (
        <div className="flex justify-center items-center p-5">
          <Loader />
        </div>
      ) : (
        <div className="bg-gray-100">
          <ArticlesList articles={generalList} />
          {hasNextPage && (
            <SpinnerObserver onIntersect={handleGetMoreArticles} />
          )}
        </div>
      )}
    </>
  );
};
