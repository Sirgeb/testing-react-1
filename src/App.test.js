import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter });

/**
 * function to create a ShallowWrapper for the App component.
 * @param {object} props - Component props specific to this setup
 * @param {object} state Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findElementByTestAttribute = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('renders without crashing', () => {
  const wrapper = setup();
  const appComponent = findElementByTestAttribute(wrapper,'component-app');
  expect(appComponent.length).toBe(1);
  // console.log(wrapper.debug());
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findElementByTestAttribute(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findElementByTestAttribute(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking button increments counter display ', () => {
  const counter = 5;
  const wrapper = setup(null, { counter });

  // find button and click
  const button = findElementByTestAttribute(wrapper, 'increment-button');
  button.simulate('click');

  // find display and test value
  const counterDisplay = findElementByTestAttribute(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});
