/* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response
}

const update = async (blogId, updatedBlog, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // }
  // const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog, config)
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog)
  return response.data
}

const remove = async (blogId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.status
}

export default { getAll, create, update, remove }