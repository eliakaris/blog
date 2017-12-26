import * as React from 'react';
import BlogList from '../BlogList';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { BlogEntryData } from '../../types/BlogEntry';

configure({ adapter: new ReactSixteenAdapter() });

describe('<BlogList /> tests', () => {
  let renderer: any;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  it('renders a snapshot of empty blog list', () => {
    const component = renderer.render(<BlogList blogEntries={[]} />);
    expect(component).toMatchSnapshot();
  });

  it('renders a snapshot of a single entry blog list', () => {
    const blogEntry: BlogEntryData = {
      html: "<div>hi there</div>",
      slug: "test-blog-entry",
      title: "test blog entry",
      summary: "summary for test blog entry",
      pretty_pub_date: "December 26th 2017",
      pub_date: "20171226"
    };

    const blogEntries = [
      blogEntry
    ];
    const component = renderer.render(<BlogList blogEntries={blogEntries} />);
    expect(component).toMatchSnapshot();
  });

  it('renders a snapshot of a multiple entry blog list', () => {
    const blogEntry1: BlogEntryData = {
      html: "<div>hi there 1</div>",
      slug: "test-blog-entry-1",
      title: "test blog entry 1",
      summary: "summary for test blog entry 1",
      pretty_pub_date: "December 26th 2017",
      pub_date: "20171226"
    };

    const blogEntry2: BlogEntryData = {
      html: "<div>hi there 2</div>",
      slug: "test-blog-entry-2",
      title: "test blog entry 2",
      summary: "summary for test blog entry 2",
      pretty_pub_date: "December 25th 2017",
      pub_date: "20171225"
    };

    const blogEntries = [
      blogEntry1,
      blogEntry2
    ];
    const component = renderer.render(<BlogList blogEntries={blogEntries} />);
    expect(component).toMatchSnapshot();
  });
});