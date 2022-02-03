import React from 'react';
import renderer from 'react-test-renderer';
import OrderForm from './index.js';

test('Cart appears when you add a line item to order', () => {
  const component = renderer.create(
    <OrderForm/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
