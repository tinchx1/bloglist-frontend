import { useRef } from 'react'
import blogsService from '../services/blogsService'
import Blog from './Blog'
import FormBlog from './FormBlog'
import Togglable from './Togglable'
const ListBlogs = ({ setNotification, blogs, username, setUser, setBlogs, loginService }) => {
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }
  const handleCreate = async (newObject) => {
    const response = await blogsService.create(newObject)
    togglableRef.current.toggleVisibility()
    setBlogs([...blogs, response.data])
  }
  const togglableRef = useRef()

  const handleUpdate = async (newObject) => {
    try {
      const request = await blogsService.update(newObject.id, newObject)
      setBlogs(blogs.map(blog => blog.id !== newObject.id ? blog : request))
    } catch (error) {
      console.error('Error updating blog:', error)
      setNotification({ message: 'Error updating blog', type: 'error' })
    }
  }
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogsService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
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
      <Togglable ref={togglableRef} buttonLabel='create new note'>
        <FormBlog
          setNotification={setNotification}
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
