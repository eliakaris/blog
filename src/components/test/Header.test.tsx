import * as React from 'react';
import Header from '../Header';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new ReactSixteenAdapter() });

describe('<Header /> tests', () => {
  let renderer: any;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  it('renders a snapshot', () => {
    const component = renderer.render(<Header />);
    expect(component).toMatchSnapshot();
  });
});