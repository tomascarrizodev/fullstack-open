import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBlog } from '../requests'
import NotificationContext from './NotificationContext'
import { Link } from 'react-router-dom'

const Blog = ({ blog, token, handleDelete, user, mockLikes }) => {
  return (
    <div style={{ border: '2px solid gray', borderRadius: '8px', padding: '8px 16px', marginBottom: '4px' }}>
      <Link to={`/blogs/${blog.id}`} className='titleAndAuthor'> {blog.title} by {blog.author} </Link>
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