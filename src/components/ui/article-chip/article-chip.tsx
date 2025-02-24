type Props = {
  text: string;
};

export const ArticleChip: React.FC<Props> = ({ text }) => {
  return (
    <span className="inline-block bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2 w-36 text-center truncate">
      {text}
    </span>
  );
};
