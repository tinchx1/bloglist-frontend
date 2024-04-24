import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FormBlog from './FormBlog'
import '@testing-library/jest-dom'

test('clicking the button calls event handler once', () => {
  const mockHandler = jest.fn()
  const FormBlogComponent = render(<FormBlog setNotification={mockHandler} handleCreate={mockHandler} />)
  const button = FormBlogComponent.getByText('create')
  fireEvent.click(button)
  expect(mockHandler).toHaveBeenCalledTimes(2)
})
