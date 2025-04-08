export interface Post {
  title: string;
  date: string;
  tags: string[];
  description: string;
  category: string;
  featured?: boolean;
  coverImage?: string | null;
  slug: string;
  content?: string;
}
