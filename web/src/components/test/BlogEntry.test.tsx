import * as React from 'react';
import BlogEntry from '../BlogEntry';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { BlogEntryData } from '../../../../server/BlogEntry';

describe('<BlogEntry /> tests', () => {
  let renderer: ShallowRenderer.ShallowRenderer;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  it('renders a snapshot of a blog entry', () => {
    const blogEntry: BlogEntryData = {
      html: '<div>hi there</div>',
      slug: 'test-blog-entry',
      title: 'test blog entry',
      pretty_pub_date: 'December 26th 2017',
      pub_date: '20171226'
    };

    const component = renderer.render(<BlogEntry blogEntry={blogEntry} />);
    expect(component).toMatchSnapshot();
  });
});
