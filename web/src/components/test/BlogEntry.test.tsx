import React from 'react';
import BlogEntry from '../BlogEntry';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { BlogEntryData } from '../../../../server/BlogEntry';
import * as API from '../../api';
import * as ReactRouterDom from 'react-router-dom';

describe('<BlogEntry /> tests', () => {
  let renderer: ShallowRenderer.ShallowRenderer;
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
  });

  it('renders a snapshot of a blog entry', () => {
    const blogEntry: BlogEntryData = {
      html: '<div>hi there</div>',
      slug: 'test-blog-entry',
      title: 'test blog entry',
      pretty_pub_date: 'December 26th 2017',
      pub_date: '20171226'
    };

    const props = {
      match: {
        params: {
          slug: 'test-blog-entry',
        },
      },
    };

    jest.spyOn(API, 'fetchBlogPost').mockReturnValue(Promise.resolve(blogEntry));

    const component = renderer.render(<BlogEntry {...props} />);

    // TODO: properly test snapshot
    expect(component).toMatchSnapshot();
  });
});
