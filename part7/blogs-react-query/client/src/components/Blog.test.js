import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('testing Blog component', () => {
  const blogId = '65bbe9adc475e7dda5786088'

  const newBlog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'Blog url',
    likes: 777,
    user: {
      username: 'pepe',
      name: 'perro'
    },
    id: 1
  }

  const newUser = {
    username: 'pepe'
  }
  
  // beforeEach(() => {
  //   container = render(<Blog blog={newBlog} />).container
  // })
  
  test('renders title and author, but not the url or likes', async () => {  
    let container
    container = render(<Blog blog={newBlog} />).container
    const titleAndAuthor = container.querySelector('.titleAndAuthor')
    const urlEle = container.querySelector('.url')
    const likesEle = container.querySelector('.likes')
  
    expect(titleAndAuthor).toBeDefined()
  
    expect(urlEle).toBeNull()
    expect(likesEle).toBeNull()
  })

  test('renders url and likes when the button is clicked', async () => {

    const mockHandler = jest.fn()
    let container = render(
      <Blog blog={newBlog} handleToggle={mockHandler} user={newUser} />
    ).container

    const user = userEvent.setup()
    const button = container.querySelector('.toggleButton')
    await user.click(button)

    const urlEle = screen.findByText('url:')
    const likesEle = screen.findByText('likes:')
    expect(urlEle).toBeDefined()
    expect(likesEle).toBeDefined()
  })

  test('when the like button is click twice, the event handler is called twice', async () => {
    const mockToggle = jest.fn()
    const mockLikes = jest.fn()

    let container = render( 
      <Blog blog={newBlog} user={newUser} handleToggle={mockToggle} mockLikes={mockLikes} />
    ).container

    const user = userEvent.setup()
    const toggleButton = container.querySelector('.toggleButton')
    await user.click(toggleButton)
    
    const likeButton = container.querySelector('.likeButton')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeButton).toBeDefined()
    expect(mockLikes).toHaveBeenCalledTimes(2)
  })
})