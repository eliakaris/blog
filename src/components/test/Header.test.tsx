import * as React from 'react';
import Header from '../Header';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('<Header /> tests', () => {
  let renderer: ShallowRenderer.ShallowRenderer;

  beforeAll(() => {
    renderer = ShallowRenderer.createRenderer();
  });

  it('renders a snapshot', () => {
    const component = renderer.render(<Header />);
    expect(component).toMatchSnapshot();
  });
});
