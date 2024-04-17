import { useState, useEffect } from 'react'
import blogService from './services/blogsService'
import ListBlogs from './components/ListBlogs'
import loginService from './services/loginService'
import FormLogin from './components/Formlogin'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
      console.log(user)
    }
  }, [])
  return (
    <div>
      {user === null
        ? (
          <FormLogin
            setUser={setUser}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />)
        : (
          <ListBlogs
            loginService={loginService}
            blogService={blogService}
            setBlogs={setBlogs}
            setUser={setUser}
            username={username}
            blogs={blogs}
          />)}
    </div>
  )
}

export default App
