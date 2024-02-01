import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState('')
  const [notiLogin, setNotiLogin] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  useEffect(() => {
    const noti = setInterval(() => {
      setNotification('')
    }, 5000)

    return () => clearInterval(noti)
  }, [notification])

  useEffect(() => {
    const noti = setInterval(() => {
      setNotiLogin('')
    }, 5000)

    return () => clearInterval(noti)
  }, [notiLogin])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService
        .login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log({ error: error.message })
      setNotiLogin(`wrogn username or password`)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const response = await blogService.create({ title, author, url }, user.token)

      if (response.status !== 201) {
        throw new Error('bad request')
      }

      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)

      setAuthor('')
      setTitle('')
      setUrl('')

      setNotification(`a new blog "${title}" by ${author} added`)

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      {user === null
        ?
        <div>
          <h1>log in to application</h1>
          {notiLogin &&
            <div style={{ background: 'gray', border: '2px solid red', borderRadius: '8px', padding: '8px', color: 'red' }}>
              {notiLogin}
            </div>
          }
          <form onSubmit={e => handleLogin(e)}>
            <span>username</span>
            <input type='text' onChange={(e) => setUsername(e.target.value)} />
            <br />
            <span>password</span>
            <input type='password' onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button>Log in</button>
          </form>
        </div>
        :
        <div>
          <p>{user.name} logged in</p>
          {notification &&
            <div style={{ background: 'gray', border: '2px solid limegreen', borderRadius: '8px', padding: '8px', color: 'limegreen' }}>
              {notification}
            </div>
          }
          <button onClick={handleLogout}>logout</button>
          <h2>create new</h2>
          <form onSubmit={(e) => handleCreate(e)}>
            <span>title</span>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <span>author</span>
            <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} />
            <br />
            <span>url</span>
            <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
            <br />
            <button>create</button>
          </form>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

    </div>
  )
}

export default App