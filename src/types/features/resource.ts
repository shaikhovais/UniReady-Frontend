export interface CategoryOverview {
  id: number;
  name: string;
  description: string;
  displayOrder: number;
  icon: string;
  color: string;
  totalCount: number;
}

export interface GetResourceOverviewResponse {
  categoryOverview: CategoryOverview[];
  recentlyAddedArticles: ArticleListItem[];
  featuredArticles: ArticleListItem[];
}

export interface GetArticlesRequest {
  search?: string;
  categoryId?: number;
  savedOnly?: boolean;
}

export interface ArticleListItem {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  categoryId: number;
  categoryName: string;
  readTimeMinutes: number;
  createdAt: string;
  updatedAt?: string;
  isSaved: boolean;
}

export interface GetArticlesResponse {
  articles: ArticleListItem[];
  totalCount: number;
}

export interface ArticleContentBlock {
  id: number;
  blockTypeId: number;
  blockTypeName: string;
  textContent?: string;
  jsonContent?: string;
  mediaUrl?: string;
  caption?: string;
  displayOrder: number;
}

export interface ArticleDetail {
  id: number;
  title: string;
  slug: string;
  categoryName: string;
  categoryIcon: string;
  categoryIconColor: string;
  readTimeMinutes: number;
  createdAt: string;
  isSaved: boolean;
  isHelpful: boolean;
  contentBlocks: ArticleContentBlock[];
}

export interface GetArticleDetailResponse {
  article: ArticleDetail;
}

export interface ArticleFeedbackRequest {
  articleId: number;
  isHelpful: boolean;
}
