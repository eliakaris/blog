import * as React from 'react';
import { Dispatch } from 'react-redux';
import BlogList, { Props } from '../components/BlogList';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { RequestBlogEntriesAction } from '../actions/index';

interface BlogListContainerProps extends Props {
  dispatch: Dispatch<RequestBlogEntriesAction>;
}

class BlogListContainer extends React.Component<BlogListContainerProps> {

  componentDidMount() {
    this.props.dispatch(actions.getBlogEntries());
  }

  render() {
    return (
      <BlogList {...this.props} />
    );
  }
}

export function mapStateToProps({ blogEntries }: StoreState) {
  return {
    blogEntries
  };
}

export default connect(mapStateToProps)(BlogListContainer);