import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, token, handleDelete, user }) => {
  const [toggler, setToggler] = useState('view')
  const [toggle, setToggle] = useState(false)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    setLikes(blog.likes)
  }, [])

  const handleToggle = () => {
    toggler === 'view' ? setToggler('hide') : setToggler('view')
    setToggle(!toggle)
  }

  const updateLikes = async () => {
    setLikes(likes + 1)
    await blogService
      .update(blog.id, { ...blog, likes: likes + 1 }, token)
  }

  return (
    <div style={{ border: '2px solid gray', borderRadius: '8px', padding: '8px 16px', marginBottom: '4px' }}>
      {blog.title} by {blog.author} <button onClick={handleToggle}>{toggler}</button>
      {
        toggle &&
        <div>
          <p>{blog.url}</p>
          <div>
            likes {likes} <button onClick={updateLikes}>like</button>
          </div>
          <p>{blog.user.name}</p>
          {
            blog.user.username === user.username &&
            <button onClick={() => handleDelete(blog.id, blog.title, blog.author)}>remove</button>
          }
        </div>
      }
    </div>
  )
}

Blog.proptypes = {
  blog: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog