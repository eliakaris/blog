import * as Request from 'superagent';

export const ApiUrl = process.env.API_URL || 'http://localhost:3001';

export async function fetchBlogPost(slug: string) {
  const response = await Request.get(`${ApiUrl}/api/v1/blog/${slug}`);
  return response.body;
};

export async function fetchBlogListings() {
  const response = await Request.get(`${ApiUrl}/api/v1/blog`);
  return response.body;
};