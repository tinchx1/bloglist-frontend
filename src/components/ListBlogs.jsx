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
    setBlogs([...blogs, response.data])
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{username} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <h3>Add a new blog</h3>
      <Togglable buttonLabel='create new note'>
        <FormBlog
          setNotification={setNotification}
          loginService={loginService}
          handleCreate={handleCreate}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
export default ListBlogs
