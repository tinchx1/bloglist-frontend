import { useState } from 'react'
const Blog = ({ blog, handleUpdate }) => {
  const [show, setShow] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = () => {
    const newBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }
    handleUpdate(newBlog)
  }
  return (
    <div style={blogStyle}>
      <p>{blog.title} {blog.author}</p>
      <button onClick={() => setShow(true)}>view</button>
      {show && (
        <div>
          <p>{blog.author}</p> <button onClick={() => setShow(false)}>hide</button>
          <p>{blog.url}</p>
          <p>{blog.likes}</p> <button onClick={handleLike}>like</button>
          <p>{blog.user.username}</p>
        </div>
      )}
    </div>
  )
}
export default Blog
