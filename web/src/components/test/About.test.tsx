import * as React from 'react';
import About from '../About';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('<About /> tests', () => {
  let renderer: ShallowRenderer.ShallowRenderer;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  it('renders a snapshot', () => {
    const component = renderer.render(<About />);
    expect(component).toMatchSnapshot();
  });
});
