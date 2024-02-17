import { createContext, useReducer } from 'react'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
  case 'ALL':
    return action.payload
  }
}

export const UserContextProvider = (props) => {
  const [userInfo, userInfoDispatch] = useReducer(userReducer, null)
  return (
    <UserContext.Provider value={[userInfo, userInfoDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext