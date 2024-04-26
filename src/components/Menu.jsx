import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ListBlogs from './ListBlogs'
import { useContext } from 'react'
import UserContext from '../UserContext'
import ListUsers from './ListUsers'
import { useQuery } from '@tanstack/react-query'
import UserBlogs from './UserBlogs'
import BlogInfo from './BlogInfo'

export const Menu = ({
  newBlogMutation,
  updateBlogMutation,
  deleteBlogMutation,
  username,
  blogs,
  notificationDispatch
}) => {
  const [, userDispatch] = useContext(UserContext)
  const handleLogout = () => {
    userDispatch({ type: 'REMOVE_USER' })
    window.localStorage.removeItem('loggedBlogAppUser')
  }
  const result = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/users/')
      return response.json()
    }
  })
  if (result.isLoading) return <div>Loading...</div>
  const users = result.data

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to='/'>Blogs</Link>
          </li>
          <li>
            <Link to='/users'>Users</Link>
          </li>
          <li>
            <p>{username} logged in</p>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path='/' element={
            <ListBlogs
              newBlogMutation={newBlogMutation}
              updateBlogMutation={updateBlogMutation}
              deleteBlogMutation={deleteBlogMutation}
              username={username}
              blogs={blogs}
            />
          }
        />
        <Route path='/users' element={<ListUsers users={users} />} />
        <Route path='/users/:id' element={<UserBlogs users={users} />} />
        <Route
          path='/:id' element={
            <BlogInfo
              notificationDispatch={notificationDispatch}
              updateBlogMutation={updateBlogMutation}
              deleteBlogMutation={deleteBlogMutation}
              blogs={blogs}
            />
          }
        />
      </Routes>
    </Router>
  )
}
