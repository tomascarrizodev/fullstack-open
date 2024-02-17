import axios from 'axios'

const baseUrl = '/api/blogs'

export const getBlogs = async () => {
  const response = await axios(baseUrl)
  return response.data
}
export const createBlog = async ({ blog, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response
}
export const deleteBlog = async ({ id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
  return id
}
export const updateBlog = async ({ blog, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}
//!
export const loginBlog = async (credentials) => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

export const getUsers = async () => {
  const response = await axios.get('/api/users')
  return response.data
}

export const createComment = async ({ blog, comment }) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, { blog, comment })
  return response.data
}