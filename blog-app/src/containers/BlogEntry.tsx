import * as React from 'react';
import { Dispatch } from 'react-redux';
import BlogEntry, { Props } from '../components/BlogEntry';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { RequestBlogEntryAction } from '../actions/index';

interface BlogEntryContainerProps extends Props {
  match: {
    params: {
      slug: string;
    }
  };
  dispatch: Dispatch<RequestBlogEntryAction>;
}

class BlogEntryContainer extends React.Component<BlogEntryContainerProps> {

  componentDidMount() {
    this.props.dispatch(actions.getBlogEntry(this.props.match.params.slug));
  }

  render() {
    return (
      <BlogEntry {...this.props} />
    );
  }
}

export function mapStateToProps({ blogEntry }: StoreState) {
  return {
    blogEntry
  };
}

export default connect(mapStateToProps)(BlogEntryContainer);