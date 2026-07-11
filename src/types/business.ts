export type Theme = "light" | "dark";

export type Business = {
  id: number;
  name: string;
  sector: string;
  category: string;
  location: string;
  description: string;
  contact: string;
  imageUrl?: string;
  tags: string[];
  verified: boolean;
  featured: boolean;
};

export type SortBy = "featured" | "name" | "sector";

export type BusinessFilters = {
  name: string;
  sector: string;
  sortBy: SortBy;
};
