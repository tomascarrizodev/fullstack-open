import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { newNotification } from '../reducers/noticationReducer'

const Blog = ({ blog, token, handleDelete, user, mockLikes }) => {
  const dispatch = useDispatch()
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
    dispatch(likeBlog({ ...blog, likes: likes + 1 }, token))
    dispatch(newNotification(`you liked "${blog.title}" by ${blog.author}`))
  }

  return (
    <div style={{ border: '2px solid gray', borderRadius: '8px', padding: '8px 16px', marginBottom: '4px' }}>
      <p className='titleAndAuthor'> {blog.title} by {blog.author} </p>
      <button className='toggleButton' onClick={handleToggle}>{toggler}</button>
      {
        toggle &&
        <div>
          <p className='url'>url: {blog.url}</p>
          <div>
            <p className='likes'>likes: {likes}</p>
            <button onClick={updateLikes}>like</button>
            <button style={{ display: 'none' }} className='likeButton' onClick={mockLikes}>like</button>
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