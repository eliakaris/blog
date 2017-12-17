
// src/types/index.tsx

import { BlogEntryData } from "./BlogEntry";

export interface HelloState {
  languageName: string;
  enthusiasmLevel: number;
}

export interface StoreState {
  blogEntry: BlogEntryData;
  blogEntries: BlogEntryData[];
  helloState: HelloState;
}
