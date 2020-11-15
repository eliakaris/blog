import * as React from 'react';
import NavigationHeader from '../NavigationHeader';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('<NavigationHeader /> tests', () => {
  let renderer: ShallowRenderer.ShallowRenderer;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  it('renders a snapshot', () => {
    const component = renderer.render(<NavigationHeader />);
    expect(component).toMatchSnapshot();
  });
});
