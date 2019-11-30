// keep in sync with client definitions at web/src/api.ts
export interface BlogEntryData {
  pretty_pub_date: string;
  html: string;
  slug: string;
  title: string;
  pub_date: string;
}

// keep in sync with client definitions at web/src/api.ts
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

// tslint:disable-next-line:interface-name
export interface IBlogProvider {
  getBlogEntries(): BlogListEntry[];
  getLatestEntry(): BlogEntryData;
  getEntryFromSlug(slug: string): BlogEntryData;
}
