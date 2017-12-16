
// src/types/index.tsx

import { BlogEntryData } from "./BlogEntry";

export interface HelloState {
  languageName: string;
  enthusiasmLevel: number;
}

export interface StoreState {
  blogEntries: BlogEntryData[];
  helloState: HelloState;
}
