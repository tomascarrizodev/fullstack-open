/* eslint-disable linebreak-style */
import { useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getBlogs, getUsers } from './requests'
import LoggedUserContext from './components/loggedUserContext'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import BlogList from './components/BlogList'
import LogIn from './components/LogIn'
import Users from './components/Users'
import IndividualUser from './components/IndividualUser'
import IndividualBlog from './components/IndividualBlog'

const App = () => {
  const [login, loginDispatch] = useContext(LoggedUserContext)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
  })
  const usersPage = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      loginDispatch({ type: 'LOGIN', payload: JSON.parse(loggedUserJSON) })
    }
  }, [])

  if (result.isLoading) {
    return <div>loading...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in the server</div>
  }

  const blogs = result.data
  const allUsers = usersPage.data

  return (
    <div className='mx-4 mt-4'>
      {login && <NavBar />}
      <LogIn />
      <Routes>
        <Route path='/' element={login ? <BlogList blogs={blogs} /> : null} />
        <Route path='/users' element={<Users users={allUsers} />} />
        <Route path='/blogs/:id' element={<IndividualBlog blogs={blogs} login={login} />} />
        <Route path='/users/:id' element={<IndividualUser users={allUsers} />} />
      </Routes>
    </div>
  )
}

export default App