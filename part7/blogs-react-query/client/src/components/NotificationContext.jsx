import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'ADDED':
    return `a new blog "${action.payload.title}" by ${action.payload.author} added`
  case 'LIKED':
    return `blog "${action.payload.title}" liked`
  case 'CLEAR':
    return null
  case 'ERROR':
    return action.payload
  default:
    return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext