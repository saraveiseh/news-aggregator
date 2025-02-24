import { ArticleCard } from "@/components/ui";
import { Article } from "@/types";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

type Props = {
  articles: Array<Article>;
};

export const ArticlesList: React.FC<Props> = ({ articles }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const virtualizer = useWindowVirtualizer({
    count: articles.length,
    estimateSize: () => 432,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  if (articles.length === 0)
    return (
      <p className="flex justify-center items-center text-center text-gray-500 text-2xl">
        No articles were found!
      </p>
    );

  return (
    <div ref={listRef} className="m-auto pt-4 max-w-[450px]">
      <ul
        className="relative space-y-4 "
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((item) => (
          <li
            key={item.key}
            className="absolute top-0 left-0 w-full"
            style={{
              height: `${item.size}px`,
              transform: `translateY(${
                item.start - virtualizer.options.scrollMargin
              }px)`,
            }}
          >
            <ArticleCard
              key={articles[item.index].title}
              {...articles[item.index]}
            ></ArticleCard>
          </li>
        ))}
      </ul>
    </div>
  );
};
