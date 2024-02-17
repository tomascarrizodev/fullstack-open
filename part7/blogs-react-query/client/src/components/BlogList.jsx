import { useContext, useState } from 'react'
import Blog from './Blog'
import NewBlog from './NewBlog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlog, deleteBlog } from '../requests'
import LoggedUserContext from './loggedUserContext'
import NotificationContext from './NotificationContext'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const BlogList = ({ blogs }) => {
  const queryClient = useQueryClient()

  const [login, loginDispatch] = useContext(LoggedUserContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (response) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(response.data))
    }
  })
  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog => blog.id !== id))
    }
  })

  const [toggleNewBlog, setToggleNewBlog] = useState(true)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (e) => {
    e.preventDefault()
    try {
      createBlogMutation.mutate({ blog: { title, author, url, likes: 0 }, token: login.token })
      setTitle('')
      setAuthor('')
      setUrl('')
      notificationDispatch({ type: 'ADDED', payload: { title, author } })
    } catch (error) {
      console.error(error)
    }
  }
  const handleDelete = (id, title, author) => {
    try {
      if (window.confirm(`Do you want to delete "${title}" by ${author}`)) {
        deleteBlogMutation.mutate({ id, token: login.token })
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      {
        toggleNewBlog
          ? <Button variant='success' className="mt-4" onClick={() => setToggleNewBlog(!toggleNewBlog)}>new blog</Button>
          : <NewBlog className="my-3" handleCreate={handleCreate} toggleNewBlog={toggleNewBlog} setToggleNewBlog={setToggleNewBlog}>
            <Form.Group>
              <Form.Label>
                title
              </Form.Label>
              <Form.Control type="text" id='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title' />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                author
              </Form.Label>
              <Form.Control type="text" id='author' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='author' />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                url
              </Form.Label>
              <Form.Control type="text" id='url' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='url' />
            </Form.Group>
          </NewBlog>
      }
      <h2>blogs</h2>
      {
        [...blogs].sort((a, b) => b.likes - a.likes).map((blog, i) =>
          <Blog key={i} blog={blog} token={login.token} handleDelete={handleDelete} user={login} />
        )
      }
    </>
  )
}

export default BlogList