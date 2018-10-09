import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from './';

Enzyme.configure({ adapter: new Adapter() });

describe('Table', () => {
  const props = {
    list: [
      {
        title: 'title 1',
        author: 'author 1',
        num_comments: 1,
        points: 2,
        objectID: 123
      },
      {
        title: 'title 2',
        author: 'author 2',
        num_comments: 4,
        points: 3,
        objectID: 1234
      }
    ],
    onDismiss: () => {}
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has valid snapshot', () => {
    const component = renderer.create(<Table {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows two items in the list', () => {
    const element = shallow(<Table {...props} />);

    expect(element.find('.c-table__row')).toHaveLength(2);
  });
});
