import { useRef } from 'react'
import blogsService from '../services/blogsService'
import Blog from './Blog'
import FormBlog from './FormBlog'
import Togglable from './Togglable'
import { useNotificationStore } from '../store/notification'
import { useBlogsStore } from '../store/blogs'
import { useUsersStore } from '../store/user'

const ListBlogs = ({ username }) => {
  const { setUser } = useUsersStore()
  const { blogs, updateBlog, removeBlog, addBlog } = useBlogsStore()
  const { setNotification } = useNotificationStore()
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }
  const handleCreate = async (newObject) => {
    const response = await blogsService.create(newObject)
    togglableRef.current.toggleVisibility()
    addBlog(response.data)
  }
  const togglableRef = useRef()

  const handleUpdate = async (newObject) => {
    try {
      const request = await blogsService.update(newObject.id, newObject)
      updateBlog(request)
    } catch (error) {
      console.error('Error updating blog:', error)
      setNotification({ message: 'Error updating blog', type: 'error' })
    }
  }
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogsService.remove(id)
        removeBlog(id)
      } catch (error) {
        console.error('Error deleting blog:', error)
        setNotification({ message: 'Error deleting blog', type: 'error' })
      }
    }
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{username} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <h3>Add a new blog</h3>
      <Togglable ref={togglableRef} buttonLabel='create new blog'>
        <FormBlog
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
