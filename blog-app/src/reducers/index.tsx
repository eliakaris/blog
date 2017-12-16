// src/reducers/index.tsx

import { EnthusiasmAction, RequestBlogEntriesAction } from '../actions';
import { StoreState, HelloState } from '../types/index';
import { BlogEntryData } from '../types/BlogEntry';
import * as actions from '../constants/index';
import { combineReducers } from 'redux';

export function enthusiasm(
  state: HelloState = { languageName: '', enthusiasmLevel: 1 },
  action: EnthusiasmAction): HelloState {
  switch (action.type) {
    case actions.INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case actions.DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    default:
      return state;

  }
}

export function blogListReducer(state: BlogEntryData[] = [], action: RequestBlogEntriesAction): BlogEntryData[] {
  switch (action.type) {
    case actions.REQUEST_BLOG_ENTRIES:
      return state;

    case actions.REQUEST_BLOG_ENTRIES_SUCCESS:
      return action.blogEntries;

    default:
      return state;
  }
}

export default combineReducers<StoreState>(
  {
    blogEntries: blogListReducer,
    helloState: enthusiasm
  }
);