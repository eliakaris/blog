import * as React from 'react';
import BlogEntry from '../BlogEntry';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { BlogEntryData } from '../../types/BlogEntry';

configure({ adapter: new ReactSixteenAdapter() });

describe('<BlogEntry /> tests', () => {
  let renderer: any;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  it('renders a snapshot of a blog entry', () => {
    const blogEntry: BlogEntryData = {
      html: "<div>hi there</div>",
      slug: "test-blog-entry",
      title: "test blog entry",
      summary: "summary for test blog entry",
      pretty_pub_date: "December 26th 2017",
      pub_date: "20171226"
    };

    const component = renderer.render(<BlogEntry blogEntry={blogEntry} />);
    expect(component).toMatchSnapshot();
  });
});