import { useState, useEffect, useReducer } from 'react'
import blogService from './services/blogsService'
import ListBlogs from './components/ListBlogs'
import FormLogin from './components/Formlogin'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from './UserContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}
const App = () => {
  const queryClient = useQueryClient()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const [user, userDispatch] = useReducer(userReducer, null)
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      userDispatch({ type: 'SET_USER', data: user })
      blogService.setToken(user.token)
    }
  }, [])
  if (result.isLoading) {
    return <div>loading data...</div>
  }
  const blogs = result.data
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      <div>
        {notification !== null && <h2>{notification}</h2>}
        {user === null
          ? (
            <FormLogin
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              notificationDispatch={notificationDispatch}
            />)
          : (
            <ListBlogs
              newBlogMutation={newBlogMutation}
              updateBlogMutation={updateBlogMutation}
              deleteBlogMutation={deleteBlogMutation}
              username={username}
              blogs={blogs}
              notificationDispatch={notificationDispatch}
            />)}
      </div>
    </UserContext.Provider>
  )
}

export default App
