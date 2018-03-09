import * as constants from '../constants';
import * as Request from 'superagent';
import { BlogEntryData, BlogListEntry } from '../../server/BlogEntry';
import { Dispatch } from 'react-redux';

interface RequestBlogEntries {
  type: constants.REQUEST_BLOG_ENTRIES;
}

interface RequestBlogEntriesSuccess {
  type: constants.REQUEST_BLOG_ENTRIES_SUCCESS;
  blogEntries: BlogListEntry[];
}

interface RequestBlogEntriesFailure {
  type: constants.REQUEST_BLOG_ENTRIES_FAIL;
  error: string;
}

export type RequestBlogEntriesAction = RequestBlogEntries | RequestBlogEntriesSuccess | RequestBlogEntriesFailure;

export function getBlogEntries() {
  return (dispatch: Dispatch<RequestBlogEntriesAction>) => {
    dispatch({ type: constants.REQUEST_BLOG_ENTRIES });
    Request.get('/api/v1/blog').then(
      (response) => {
        dispatch({ type: constants.REQUEST_BLOG_ENTRIES_SUCCESS, blogEntries: response.body});
      },
      (failureReason) => {
        dispatch({ type: constants.REQUEST_BLOG_ENTRIES_FAIL, error: failureReason.message});
      });
  };
}

interface RequestBlogEntry {
  type: constants.REQUEST_BLOG_ENTRY;
}

interface RequestBlogEntrySuccess {
  type: constants.REQUEST_BLOG_ENTRY_SUCCESS;
  blogEntry: BlogEntryData;
}

interface RequestBlogEntryFailure {
  type: constants.REQUEST_BLOG_ENTRY_FAIL;
  error: string;
}

export type RequestBlogEntryAction = RequestBlogEntry | RequestBlogEntrySuccess | RequestBlogEntryFailure;

export function getBlogEntry(slug: string) {
  return (dispatch: Dispatch<RequestBlogEntryAction>) => {
    dispatch({ type: constants.REQUEST_BLOG_ENTRY });
    if (!slug || slug.length === 0) {
      slug = 'latest';
    }

    Request.get(`/api/v1/blog/${slug}`).then(
      (response) => {
        dispatch({ type: constants.REQUEST_BLOG_ENTRY_SUCCESS, blogEntry: response.body});
      },
      (failureReason) => {
        dispatch({ type: constants.REQUEST_BLOG_ENTRY_FAIL, error: failureReason.message});
      });
  };
}