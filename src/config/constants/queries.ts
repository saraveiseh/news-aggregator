export const PAGE_SIZE = 10;

export const CATEGORIES = [
  {
    id: 1,
    name: "General",
    sources: { nyt: "Front Page", newsApi: "general", guardian: "news" },
  },
  {
    id: 2,
    name: "Entertainment",
    sources: { nyt: "Arts", newsApi: "entertainment", guardian: "film" },
  },
  {
    id: 3,
    name: "Business",
    sources: { nyt: "Business", newsApi: "business", guardian: "business" },
  },
  {
    id: 4,
    name: "Health",
    sources: { nyt: "Health", newsApi: "health", guardian: "lifeandstyle" },
  },
  {
    id: 5,
    name: "Science",
    sources: { nyt: "Science", newsApi: "science", guardian: "science" },
  },
  {
    id: 6,
    name: "Sports",
    sources: { nyt: "Sports", newsApi: "sports", guardian: "sport" },
  },
  {
    id: 7,
    name: "Technology",
    sources: {
      nyt: "Technology",
      newsApi: "technology",
      guardian: "technology",
    },
  },
];

export const SOURCES = [
  { label: "All", value: "all" },
  {
    label: "NYT",
    value: "nyt",
  },
  {
    label: "News API",
    value: "newsApi",
  },
  {
    label: "Guardian",
    value: "guardian",
  },
];
