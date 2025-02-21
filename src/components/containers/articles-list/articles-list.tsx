import { ArticleCard } from "@/components/ui";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

type Props = {
  articles: Array<{
    title: string;
    image?: string;
    description: string;
    date: string;
    author?: string;
  }>;
};

export const ArticlesList: React.FC<Props> = ({ articles }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const virtualizer = useWindowVirtualizer({
    count: articles.length,
    estimateSize: () => 432,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  return (
    <div>
      <h1>Articles List</h1>
      <div ref={listRef} className="px-4">
        <ul
          className="relative w-full space-y-4"
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
    </div>
  );
};
