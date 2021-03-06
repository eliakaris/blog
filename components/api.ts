import * as Request from 'superagent';

export async function fetchBlogPost(slug: string) {
  const response = await Request.get(`/api/v1/blog/${slug}`);
  return response.body;
};

export async function fetchBlogListings() {
  const response = await Request.get('/api/v1/blog');
  return response.body;
};

// keep in sync with api defitions at server/BlogEntry.ts
export interface BlogEntryData {
  pretty_pub_date: string;
  html: string;
  slug: string;
  title: string;
  pub_date: string;
}

// keep in sync with api defitions at server/BlogEntry.ts
export interface BlogListEntry {
  slug: string;
  title: string;
  pub_date: Date;
  pretty_pub_date: string;
  summary: string;
}