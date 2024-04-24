import { useState, useEffect } from 'react'
import blogService from './services/blogsService'
import ListBlogs from './components/ListBlogs'
import { useNotificationStore } from './store/notification'
import { useBlogsStore } from './store/blogs'
import FormLogin from './components/FormLogin'
import { useUsersStore } from './store/user'

const App = () => {
  const { fetchBlogs } = useBlogsStore()
  const { user, setUser } = useUsersStore()
  console.log('user:', user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notification = useNotificationStore(state => state.notification)
  useEffect(() => {
    fetchBlogs()
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
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />)
        : (
          <ListBlogs
            username={username}
          />)}
    </div>
  )
}

export default App
