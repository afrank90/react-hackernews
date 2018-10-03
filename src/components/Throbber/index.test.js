import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Throbber from './';

Enzyme.configure({ adapter: new Adapter() });

describe('Throbber', () => {
  const props = {
    className: 'test-class-name'
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Throbber {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has valid snapshot', () => {
    const component = renderer.create(<Throbber {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
