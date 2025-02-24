import { Article } from "@/types";
import { ArticleChip } from "../article-chip";

export const ArticleCard: React.FC<Article> = ({
  image,
  title,
  description,
  date,
  author,
  url,
}) => (
  <article className=" bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg h-[400px] w-full cursor-pointer">
    <a href={url}>
      <div className="relative">
        <img
          src={image}
          alt={title}
          height={120}
          className="  h-52 w-full object-fill"
        />
        <span className="absolute top-0 left-0 w-full h-full bg-black opacity-30" />
        <h3 className="absolute bottom-0 left-0 px-2 font-bold text-xl mb-2 text-white">
          {title}
        </h3>
      </div>
      <div className="px-2 py-4">
        <p className="text-gray-500 text-sm h-[102px] overflow-hidden">
          {description}
        </p>
      </div>
      <div className="flex px-2">
        <ArticleChip text={date} />
        {!!author && <ArticleChip text={author} />}
      </div>
    </a>
  </article>
);
