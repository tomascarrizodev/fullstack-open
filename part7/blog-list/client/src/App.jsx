/* eslint-disable linebreak-style */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, logOut } from './reducers/loginReducer'
import { createBlog, deleteBlog, initializeBlogs } from './reducers/blogReducer'
import { newNotification } from './reducers/noticationReducer'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => {
    console.log(state)
    return state.blogs
  })
  const login = useSelector(state => state.login)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [toggleNewBlog, setToggleNewBlog] = useState(true)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      dispatch(logIn({ username, password }))
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log({ error: error.message })
    }
  }
  const handleLogout = () => {
    dispatch(logOut())
  }
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      dispatch(createBlog({ title, author, url }, login.token))
      dispatch(newNotification(`new blog "${title}" by ${author} added`))
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleDelete = async (id, title, author) => {
    try {
      if (window.confirm(`Are you sure you want to delete "${title}" by ${author}?`)) {
        dispatch(deleteBlog(id, login.token))
        dispatch(newNotification(`blog "${title}" by ${author} deleted`))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      {login === null
        ?
        <div>
          <h1>log in to application</h1>
          <form onSubmit={e => handleLogin(e)}>
            <span>username</span>
            <input type='text' onChange={(e) => setUsername(e.target.value)} />
            <br />
            <span>password</span>
            <input type='password' onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button type='submit'>Log in</button>
          </form>
        </div>
        :
        <div>
          <span>{login.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
          <br />
          {
            toggleNewBlog
              ? <button onClick={() => setToggleNewBlog(!toggleNewBlog)}>new blog</button>
              : <NewBlog handleCreate={handleCreate} toggleNewBlog={toggleNewBlog} setToggleNewBlog={setToggleNewBlog}>
                <span>title</span>
                <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title' />
                <br />
                <span>author</span>
                <input type='text' id='author' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='author' />
                <br />
                <span>url</span>
                <input type='text' id='url' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='url' />
                <br />
              </NewBlog>
          }
          <h2>blogs</h2>
          {[...blogs].sort((a, b) => b.likes - a.likes).map((blog, i) =>
            <Blog key={i} blog={blog} token={login.token} handleDelete={handleDelete} user={login} />
          )}
        </div>
      }

    </div>
  )
}

export default App