import { useState, useEffect } from 'react'
import blogService from './services/blogsService'
import ListBlogs from './components/ListBlogs'
import FormLogin from './components/Formlogin'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  return (
    <div>
      {notification !== null && <h2>{notification}</h2>}
      {user === null
        ? (
          <FormLogin
            setUser={setUser}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            setNotification={setNotification}
          />)
        : (
          <ListBlogs
            setBlogs={setBlogs}
            setUser={setUser}
            username={username}
            blogs={blogs}
            setNotification={setNotification}
          />)}
    </div>
  )
}

export default App
