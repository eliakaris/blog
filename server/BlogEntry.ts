export interface BlogEntryData {
  pretty_pub_date: string;
  html: string;
  slug: string;
  title: string;
  pub_date: string;
}

export interface BlogListEntry {
  slug: string;
  title: string;
  pub_date: Date;
  pretty_pub_date: string;
  summary: string;
}

export interface BlogData {
  slug: string;
  title: string;
  pub_date: string;
}
