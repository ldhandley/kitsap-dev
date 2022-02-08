import React from 'react';
import renderer from 'react-test-renderer';
import {OrderForm} from './index.js';
import '@testing-library/jest-dom'
import {render, fireEvent, screen, getByText} from '@testing-library/react'
import {within} from '@testing-library/dom'


test('Cart appears when you add a line item to order', () => {
  render(<OrderForm/>);
  let button = screen.getByText('Add to Order')
  let cart = screen.queryByText("Delivery or Pickup?")
  expect(cart).not.toBeInTheDocument()
  expect(button).toBeInTheDocument()
  fireEvent.click(button)
  cart = screen.queryByText("Delivery or Pickup?")
  expect(cart).toBeInTheDocument()
  let order = screen.getByRole("heading", {name: "Order"})
  expect(order).toBeInTheDocument()
  let lineItem = screen.getByText("Pepperoni Pizza - 10 inches")
  expect(lineItem).toBeInTheDocument()
});
