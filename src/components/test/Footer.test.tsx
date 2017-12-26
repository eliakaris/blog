import * as React from 'react';
import Footer from '../Footer';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new ReactSixteenAdapter() });

describe('<Footer /> tests', () => {
  let renderer: any;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  it('renders a snapshot', () => {
    const component = renderer.render(<Footer />);
    expect(component).toMatchSnapshot();
  });
});