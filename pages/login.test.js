import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import LoginPage from './login'
test('renders component', () => {
  const { getByText } = render(<LoginPage />)
  expect(getByText('Identifier')).toBeInTheDocument()
})
