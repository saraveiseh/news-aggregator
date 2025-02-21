export interface GetNYTArticles {
  status: string;
  copyright: string;
  response: GetNYTArticlesResponse;
}

export interface GetNYTArticlesResponse {
  docs: Doc[];
  meta: Meta;
}

export interface Doc {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: Multimedum[];
  headline: Headline;
  keywords: Keyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name?: string;
  byline: Byline;
  _id: string;
  word_count: number;
  uri: string;
  print_section?: string;
  print_page?: string;
  type_of_material?: string;
}

export interface Multimedum {
  rank: number;
  subtype: string;
  caption?: string;
  credit?: string;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: Legacy;
  subType: string;
  crop_name: string;
}

export interface Legacy {
  xlarge?: string;
  xlargewidth?: number;
  xlargeheight?: number;
  thumbnail?: string;
  thumbnailwidth?: number;
  thumbnailheight?: number;
  widewidth?: number;
  wideheight?: number;
  wide?: string;
}

export interface Headline {
  main: string;
  kicker: string;
  content_kicker: string;
  print_headline?: string;
  name: string;
  seo: string;
  sub: string;
}

export interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface Byline {
  original?: string;
  person: Person[];
  organization: string;
}

export interface Person {
  firstname: string;
  middlename?: string;
  lastname: string;
  qualifier: string;
  title: string;
  role: string;
  organization: string;
  rank: number;
}

export interface Meta {
  hits: number;
  offset: number;
  time: number;
}
