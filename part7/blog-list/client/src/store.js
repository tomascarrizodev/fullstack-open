import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import noticationReducer from './reducers/noticationReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: noticationReducer,
    login: loginReducer
  }
})

export default store