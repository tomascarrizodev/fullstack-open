import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

describe('New blog form', () => {
  test('the form receives the right details', async () => {
    const mockHandler = jest.fn()

    const container = render(
      <NewBlog handleCreate={mockHandler}>
        <span>title</span>
        <input type='text' id='title' />
        <br />
        <span>author</span>
        <input type='text' id='author' />
        <br />
        <span>url</span>
        <input type='text' id='url' />
        <br />
      </NewBlog>
    ).container

    const user = userEvent.setup()

    const inputTitle = container.querySelector('#title')
    const inputAuthor = container.querySelector('#author')
    const inputUrl = container.querySelector('#url')

    await user.type(inputTitle, 'Its a new blog')
    await user.type(inputAuthor, 'Author name')
    await user.type(inputUrl, 'link to the blog')

    const createButton = screen.getByText('create')
    await user.click(createButton)

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(inputTitle.value).toBe('Its a new blog')
    expect(inputAuthor.value).toBe('Author name')
    expect(inputUrl.value).toBe('link to the blog')

  })
})