export interface Frontmatter {
  title: string;
  href: string;
  filePath: string;
  publishedDate?: string;
  slug?: string;
  tags?: string[];
  draft?: boolean;
  archived?: boolean;
}

export interface Page {
  title: string;
  slug: string;
}

export interface Route {
  label: string;
  pages: { title: string; slug: string }[];
}
