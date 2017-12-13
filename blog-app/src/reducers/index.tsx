// src/reducers/index.tsx

import { EnthusiasmAction } from '../actions';
import { StoreState, SlugToBlogEntryMap } from '../types/index';
import { BlogEntryData } from "../types/BlogEntry";
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants/index';

export function enthusiasm(state: StoreState = { languageName: '', enthusiasmLevel: 1, blogEntries: {} }, action: EnthusiasmAction): StoreState {
  const test: BlogEntryData = {
    html: "elia",
    pretty_pub_date: '',
    pub_date: '',
    slug: '',
    summary: '',
    title: ''
  };

  var blogEntryMap: SlugToBlogEntryMap = {};
  blogEntryMap['test'] = test;

  state.blogEntries["test"] = test;
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1, blogEntries: blogEntryMap };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    default:
      return state;

  }
}