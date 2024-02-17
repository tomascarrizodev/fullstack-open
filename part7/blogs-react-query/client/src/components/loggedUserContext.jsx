import { createContext, useReducer } from 'react'

const LoggedUserContext = createContext()

const loggedUserReducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.payload
  case 'LOGOUT':
    return null
  }
}

export const LoggedUserContextProvider = (props) => {
  const [loggedUser, loggedUserDispatch] = useReducer(loggedUserReducer, null)
  return (
    <LoggedUserContext.Provider value={[loggedUser, loggedUserDispatch]} >
      {props.children}
    </LoggedUserContext.Provider>
  )
}

export default LoggedUserContext