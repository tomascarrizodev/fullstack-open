import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    logInMethod(state, action) {
      return action.payload
    },
    logOutMethod() {
      return null
    }
  }
})

export const { logInMethod, logOutMethod } = loginSlice.actions

export const logIn = (userInfo) => {
  return async dispatch => {
    const response = await loginService.login(userInfo)
    dispatch(logInMethod(response))
  }
}
export const logOut = () => {
  return async dispatch => {
    dispatch(logOutMethod())
  }
}

export default loginSlice.reducer