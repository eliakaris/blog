import * as React from 'react';
import NavigationHeader from '../NavigationHeader';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new ReactSixteenAdapter() });

describe('<NavigationHeader /> tests', () => {
  let renderer: any;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  it('renders a snapshot', () => {
    const component = renderer.render(<NavigationHeader />);
    expect(component).toMatchSnapshot();
  });
});