import * as React from 'react';
import Footer from '../Footer';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('<Footer /> tests', () => {
  let renderer: ShallowRenderer.ShallowRenderer;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  it('renders a snapshot', () => {
    const component = renderer.render(<Footer />);
    expect(component).toMatchSnapshot();
  });
});
