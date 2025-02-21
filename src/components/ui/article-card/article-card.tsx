type Props = {
  title: string;
  image?: string;
  description: string;
  date: string;
  author?: string;
};

export const ArticleCard: React.FC<Props> = ({
  image,
  title,
  description,
  date,
  author,
}) => (
  <article className=" rounded-lg border border-gray-200 overflow-hidden shadow-lg h-[400px] max-w-[385px]">
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
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2 mr-auto">
        {date}
      </span>
      {!!author && (
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {author}
        </span>
      )}
    </div>
  </article>
);
