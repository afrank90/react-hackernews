import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withLoading from './withLoading';
import Throbber from '../components/Throbber';

Enzyme.configure({ adapter: new Adapter() });

// A fixture component for testing withLoading HOC.
const FooComponent = () => (
  <div className="c-foo-component">
    {'This is fake component for testing purposes.'}
  </div>
);

describe('withLoading', () => {
  it ('should return loading throbber if isLoading equals true.', () => {
    const TestComponentWithLoading = withLoading(FooComponent);
    const wrapper = shallow(
      <TestComponentWithLoading 
        isLoading={true}
      >Foo child text.</TestComponentWithLoading>
    );

    expect(wrapper.type()).toEqual(Throbber);
  });

  it ('should return expected component if isLoading equal false', () => {
    const TestComponentWithLoading = withLoading(FooComponent);
    const wrapper = shallow(
      <TestComponentWithLoading 
        isLoading={false}
      >Foo child text.</TestComponentWithLoading>
    );

    expect(wrapper.type()).toEqual(FooComponent);
  });

  it ('should be able to override throbber size', () => {
    const TestComponentWithLoading = withLoading(FooComponent);
    const wrapper = shallow(
      <TestComponentWithLoading 
        isLoading={true}
        throbberSize="custom-size"
      >Foo child text.</TestComponentWithLoading>
    );

    expect(wrapper.find('.c-throbber__custom-size').exists()).toEqual(true);
  });
});
