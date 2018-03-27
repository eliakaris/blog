// src/types/index.tsx
import { BlogEntryData, BlogListEntry } from '../../server/BlogEntry';

export interface StoreState {
  blogEntry: BlogEntryData;
  blogEntries: BlogListEntry[];
}
