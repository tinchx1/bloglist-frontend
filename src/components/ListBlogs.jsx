import Blog from './Blog'
import FormBlog from './FormBlog'
const ListBlogs = ({ blogs, username, setUser, setBlogs, blogService, loginService }) => {
  const handleLogout = () => {
    setUser(null)
  }
  const handleCreate = async (newObject) => {
    await blogService.create(newObject)
    setBlogs([...blogs, newObject])
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{username} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <h3>Add a new blog</h3>
      <FormBlog
        loginService={loginService}
        handleCreate={handleCreate}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
export default ListBlogs
