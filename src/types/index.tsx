
// src/types/index.tsx

import { BlogEntryData, BlogListEntry } from "./BlogEntry";

export interface StoreState {
  blogEntry: BlogEntryData;
  blogEntries: BlogListEntry[];
}
