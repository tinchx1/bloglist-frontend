import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <Link to={`/${blog.id}`}>
        <p>{blog.title} {blog.author}</p>
      </Link>
    </div>
  )
}

export default Blog
