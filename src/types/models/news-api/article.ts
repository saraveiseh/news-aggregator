export interface NewsApiArticle {
  source: NewsApiSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsApiSource {
  id: string;
  name: string;
}

export interface NewsApiGetArticlesResponse {
  articles: NewsApiArticle[];
  totalResults: number;
}
