import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createComment, updateBlog } from '../requests'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'

const IndividualBlog = ({ blogs, login }) => {
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)
  const [likes, setLikes] = useState(0)
  const [comment, setComment] = useState('')

  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
    }
  })
  const commentBlogMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog => blog.id !== updatedBlog.id ? blog : { ...blog, comments: updatedBlog.comments }))
    }
  })

  useEffect(() => {
    setLikes(blog.likes)
  }, [])

  const updateLikes = () => {
    setLikes(likes + 1)
    updateBlogMutation.mutate({ blog: { ...blog, likes: likes + 1 }, token: login.token })
  }
  const handleComment = e => {
    e.preventDefault()
    setComment('')
    commentBlogMutation.mutate({ blog: { ...blog, user: blog.user.id, comments: blog.comments.concat(comment) }, comment } )
  }
  return (
    <div className="d-flex flex-column gap-2">
      <h2>{blog.title}</h2>
      <a href={blog.url} >{blog.url}</a>
      <p>{likes} likes <Button size="sm" onClick={updateLikes}>like</Button></p>
      <p>added by {blog.author}</p>
      <h3>comments</h3>
      <Form onSubmit={handleComment}>
        <InputGroup>
          <Form.Control type='text' value={comment} onChange={e => setComment(e.target.value)} />
          <Button type='submit' variant="success">add comment</Button>
        </InputGroup>
      </Form>
      {blog.comments &&
        <ListGroup className="mt-2">
          {
            blog.comments.map((c, i) => {
              return <ListGroup.Item key={i}>{c}</ListGroup.Item>
            })
          }
        </ListGroup>
      }
    </div>
  )
}

export default IndividualBlog