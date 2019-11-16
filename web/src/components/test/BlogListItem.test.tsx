import * as React from 'react';
import BlogListItem from '../BlogListItem';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { BlogListEntry } from '../../../../server/BlogEntry';

describe('<BlogListItem /> tests', () => {
  let renderer: ShallowRenderer.ShallowRenderer;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  it('renders a snapshot', () => {
    const blogEntry: BlogListEntry = {
      slug: 'test-blog-entry',
      title: 'test blog entry',
      pub_date: new Date(2017, 12, 26),
      pretty_pub_date: 'December 26th, 2017',
      summary: 'this is a summary text'
    };

    const component = renderer.render(<BlogListItem blogItem={blogEntry} />);
    expect(component).toMatchSnapshot();
  });
});