import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Search from './';

describe('Search', () => {
  const props = {
    onChange: () => {},
    onSubmit: () => {}
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search {...props}>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has valid snapshot', () => {
    const component = renderer.create(<Search {...props}>Search</Search>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
