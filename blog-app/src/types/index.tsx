import { BlogEntryData } from "./BlogEntry";

// src/types/index.tsx

export interface SlugToBlogEntryMap {
  [slug: string]: BlogEntryData;
}

export interface StoreState {
  blogEntries: SlugToBlogEntryMap;

  languageName: string;
  enthusiasmLevel: number;
}
