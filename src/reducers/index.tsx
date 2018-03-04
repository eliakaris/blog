// src/reducers/index.tsx

import { RequestBlogEntriesAction, RequestBlogEntryAction } from '../actions';
import { StoreState } from '../types/index';
import { BlogEntryData, BlogListEntry } from '../../server/BlogEntry';
import * as actions from '../constants/index';
import { combineReducers } from 'redux';

export function blogEntry(
  state: BlogEntryData = {
    html: '',
    pretty_pub_date: '',
    pub_date: '',
    slug: '',
    title: ''
  },
  action: RequestBlogEntryAction): BlogEntryData {
  switch (action.type) {
    case actions.REQUEST_BLOG_ENTRY:
      return state;

    case actions.REQUEST_BLOG_ENTRY_SUCCESS:
      return action.blogEntry;

    default:
      return state;
  }
}

export function blogEntries(state: BlogListEntry[] = [], action: RequestBlogEntriesAction): BlogListEntry[] {
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
    blogEntry,
    blogEntries
  }
);