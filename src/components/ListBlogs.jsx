import { useContext, useRef } from 'react'
import Blog from './Blog'
import FormBlog from './FormBlog'
import Togglable from './Togglable'
import UserContext from '../UserContext'

const ListBlogs = ({ deleteBlogMutation, notificationDispatch, updateBlogMutation, blogs, username, newBlogMutation, loginService }) => {
  const [, userDispatch] = useContext(UserContext)
  const handleLogout = () => {
    userDispatch({ type: 'REMOVE_USER' })
    window.localStorage.removeItem('loggedBlogAppUser')
  }
  const handleCreate = async (newObject) => {
    newBlogMutation.mutate(newObject)
    togglableRef.current.toggleVisibility()
  }

  const togglableRef = useRef()

  const handleUpdate = async (newObject) => {
    try {
      console.log('newObject:', newObject)
      updateBlogMutation.mutate(newObject)
    } catch (error) {
      console.error('Error updating blog:', error)
      notificationDispatch({ message: 'Error updating blog', type: 'SET_NOTIFICATION' })
    }
  }
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        deleteBlogMutation.mutate(id)
      } catch (error) {
        notificationDispatch({ message: 'Error deleting blog', type: 'SET_NOTIFICATION' })
      }
    }
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{username} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <h3>Add a new blog</h3>
      <Togglable ref={togglableRef} buttonLabel='create new note'>
        <FormBlog
          notificationDispatch={notificationDispatch}
          loginService={loginService}
          handleCreate={handleCreate}
        />
      </Togglable>
      {blogs.sort((a, b) => {
        return b.likes - a.likes
      }).map(blog =>
        <Blog handleDelete={handleDelete} handleUpdate={handleUpdate} key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default ListBlogs
