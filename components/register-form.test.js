import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import RegisterForm from './register-form'

describe('password input', () => {
  test('it should validate length', async () => {
    const { findByLabelText, findByText, findByRole } = render(<RegisterForm />)
    const input = await findByLabelText('Password')

    await act(async () => {
      fireEvent.input(input, { target: { value: 'aA2' } })
      fireEvent.submit(await findByRole('button'))

      const error = await findByText(/must at least 8/)
      expect(error).toBeInTheDocument()
    })
  })

  test('it should validate complexity', async () => {
    const { findByLabelText, findByText, findByRole } = render(<RegisterForm />)
    const input = await findByLabelText('Password')

    await act(async () => {
      fireEvent.input(input, { target: { value: 'abcdedfghdf' } })
      fireEvent.submit(await findByRole('button'))

      const error = await findByText(/must include lower/)
      expect(error).toBeInTheDocument()
    })
  })
})
