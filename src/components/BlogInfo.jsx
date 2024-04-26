import { useParams } from 'react-router-dom'

const BlogInfo = ({ blogs, notificationDispatch, updateBlogMutation, deleteBlogMutation }) => {
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
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
    <div>
      <p> {blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes}</p> <button onClick={handleLike}>like</button>
      <p>{blog.user.username}</p>
      <button onClick={() => handleDelete(blog.id)}>remove</button>
    </div>
  )
}
export default BlogInfo
