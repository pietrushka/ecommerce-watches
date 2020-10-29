import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'

import { useCart, CartProvider } from './useCart'


let hook = null;

beforeEach(() => {
  const {result} = renderHook(() => useCart(), {
    wrapper: ({children}) => (
      <CartProvider>
        {children}
      </CartProvider>
    )
  })
  hook = result
});

afterEach(() => {
  hook = null;
});

test('Adds item', () => {
  act( () => {
    hook.current.addItem({ id: 1, quantity: 3})
  })
  expect(hook.current.getCartItemsQuantity()).toBe(3)
})

test('Removes item', () => {
  act(() => {
    hook.current.removeItem({ id: 1, quantity: 1 })
  })
  expect(hook.current.getCartItemsQuantity()).toBe(2)
})

test('Cleares item', () => {
  act(() => {
    hook.current.clearItem({ id: 1})
  })
  expect(hook.current.getCartItemsQuantity()).toBe(0)
})