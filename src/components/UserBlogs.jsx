import { useParams } from 'react-router-dom'

const UserBlogs = ({ users }) => {
  const { id } = useParams()
  const user = users.find(user => user._id === id)
  return (
    <div>
      <h1>{user.username}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default UserBlogs
