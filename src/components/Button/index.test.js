import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './';

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  const props = {
    onClick: () => {},
    className: 'test-class-name',
    children: 'Button text.'
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>More results</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has valid snapshot', () => {
    const component = renderer.create(<Button>More results</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows expected text', () => {
    const element = shallow(<Button {...props} />);

    expect(element.text()).toBe(props.children);
  });

  it('hsa expected class name', () => {
    const element = shallow(<Button {...props} />);

    expect(element.hasClass(props.className)).toBe(true);
  });
});
