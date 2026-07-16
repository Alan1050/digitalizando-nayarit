export type Theme = "light" | "dark";

export type Business = {
  id: number;
  name: string;
  route: string;
  page: string;
  logo: string;
  sector: string;
  category: string;
  location: string;
  description: string;
  contact: string;
  tags: string[];
  verified: boolean;
  featured: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    schemaType?: string;
  };
};

export type SortBy = "featured" | "name" | "sector";

export type BusinessFilters = {
  name: string;
  sector: string;
  sortBy: SortBy;
};
