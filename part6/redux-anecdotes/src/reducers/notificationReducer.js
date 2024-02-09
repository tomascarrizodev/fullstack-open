import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    renderNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const { renderNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(renderNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer