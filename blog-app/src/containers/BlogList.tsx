import BlogList from '../components/BlogList';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';

export function mapStateToProps({ blogEntries }: StoreState) {
  return {
    blogEntries
  };
}

export default connect(mapStateToProps)(BlogList);