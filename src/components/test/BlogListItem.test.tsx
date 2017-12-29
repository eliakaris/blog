import * as React from 'react';
import BlogListItem from '../BlogListItem';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { BlogListEntry } from '../../types/BlogEntry';

configure({ adapter: new ReactSixteenAdapter() });

describe('<BlogListItem /> tests', () => {
  let renderer: any;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });


  it('renders a snapshot', () => {
    const blogEntry: BlogListEntry = {
      slug: "test-blog-entry",
      title: "test blog entry",
      pub_date: "20171226",
      pretty_pub_date: "December 26th, 2017",
      summary: "this is a summary text"
    };

    const component = renderer.render(<BlogListItem blogItem={blogEntry} />);
    expect(component).toMatchSnapshot();
  });
});