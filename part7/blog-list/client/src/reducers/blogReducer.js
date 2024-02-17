import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlog(state, action) {
      console.log(action.payload)
      return action.payload
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
    },
    removeBlog(state, action) {
      const newList = state.filter(blog => blog.id !== action.payload)
      return newList
    }
  }
})

export const { setBlog, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogService.getAll()
    dispatch(setBlog(allBlogs))
  }
}
export const createBlog = (blog, token) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog, token)
    dispatch(appendBlog(newBlog.data))
  }
}
export const likeBlog = (blog, token) => {
  return async dispatch => {
    await blogService.update(blog.id, blog, token)
    dispatch(updateBlog(blog))
  }
}
export const deleteBlog = (id, token) => {
  return async dispatch => {
    await blogService.remove(id, token)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer