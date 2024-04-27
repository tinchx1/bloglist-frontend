import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogsService from '../services/blogsService'
import { Button } from './ui/button'
import { Input } from '../../@/components/ui/input'
const BlogInfo = ({ blogs, notificationDispatch, updateBlogMutation, deleteBlogMutation }) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
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
  const handleNewComment = async () => {
    const newComment = {
      content: comment
    }
    try {
      const response = await blogsService.createComment(newComment, blog.id)
      setComments([...comments, response.data])
    } catch (error) {
      console.error('Error creating comment:', error)
      notificationDispatch({ message: 'Error creating comment', type: 'SET_NOTIFICATION' })
    }
  }
  const handleComment = (event) => setComment(event.target.value)
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await blogsService.getComment(blog.id)
        setComments(response)
      } catch (error) {
        console.error('Error getting comments:', error)
        notificationDispatch({ message: 'Error getting comments', type: 'SET_NOTIFICATION' })
      }
    }
    getComments()
  }, [])

  return (
    <div>
      <h1> {blog.author}</h1>
      <p>{blog.url}</p>
      <p>{blog.likes}</p> <button onClick={handleLike}>like</button>
      <p>added by {blog.user.username}</p>
      <button onClick={() => handleDelete(blog.id)}>remove</button>
      <h3>Comments</h3>
      <Input onChange={(event) => handleComment(event)} type='text' value={comment} />
      <Button onClick={handleNewComment} type='submit'>add comment</Button>
      <ul>
        {comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
      </ul>
    </div>
  )
}
export default BlogInfo
