import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import '@testing-library/jest-dom'

describe('Blog', () => {
  test('renders blog', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      likes: 1,
      author: 'Test Author',
      url: 'http://test.com'
    }
    const component = render(<Blog blog={blog} />)
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library Test Author'
    )
    expect(component.container).not.toHaveTextContent(
      'http://test.com'
    )
  })
  test('clicking the button shows the url and likes', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      likes: 1,
      author: 'Test Author',
      url: ' http://test.com '
    }
    const component = render(<Blog blog={blog} />)
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
      'http://test.com 1'
    )
  })
  test('clicking the like button twice calls event handler twice', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      likes: 1,
      author: 'Test Author',
      url: ' http://test.com '
    }
    const mockHandler = jest.fn()
    const component = render(<Blog blog={blog} handleUpdate={mockHandler} />)
    const button = component.getByText('view')
    fireEvent.click(button)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})
