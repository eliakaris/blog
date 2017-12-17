import * as constants from '../constants';
import * as Request from 'superagent';
import { BlogEntryData } from '../types/BlogEntry';
import { Dispatch } from 'react-redux';

export interface IncrementEnthusiasm {
    type: constants.INCREMENT_ENTHUSIASM;
}

export interface DecrementEnthusiasm {
    type: constants.DECREMENT_ENTHUSIASM;
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;

export function incrementEnthusiasm(): IncrementEnthusiasm {
    return {
        type: constants.INCREMENT_ENTHUSIASM
    };
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
    return {
        type: constants.DECREMENT_ENTHUSIASM
    };
}

interface RequestBlogEntries {
  type: constants.REQUEST_BLOG_ENTRIES;
}

interface RequestBlogEntriesSuccess {
  type: constants.REQUEST_BLOG_ENTRIES_SUCCESS;
  blogEntries: BlogEntryData[];
}

interface RequestBlogEntriesFailure {
  type: constants.REQUEST_BLOG_ENTRIES_FAIL;
  error: string;
}

export type RequestBlogEntriesAction = RequestBlogEntries | RequestBlogEntriesSuccess | RequestBlogEntriesFailure;

export function getBlogEntries() {
  return (dispatch: Dispatch<RequestBlogEntriesAction>) => {
    dispatch({ type: constants.REQUEST_BLOG_ENTRIES });
    Request.get('/api/blog').then(
      (response) => {
        dispatch({ type: constants.REQUEST_BLOG_ENTRIES_SUCCESS, blogEntries: response.body});
      },
      (failureReason) => {
        dispatch({ type: constants.REQUEST_BLOG_ENTRIES_FAIL, error: failureReason.message});
      });
  };
}