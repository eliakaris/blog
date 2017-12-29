import * as React from 'react';
import About from '../About';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new ReactSixteenAdapter() });

describe('<About /> tests', () => {
  let renderer: any;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  it('renders a snapshot', () => {
    const component = renderer.render(<About />);
    expect(component).toMatchSnapshot();
  });
});