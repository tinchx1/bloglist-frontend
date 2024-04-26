import { useRef } from 'react'
import Blog from './Blog'
import FormBlog from './FormBlog'
import Togglable from './Togglable'

const ListBlogs = ({ notificationDispatch, blogs, newBlogMutation, loginService }) => {
  const handleCreate = async (newObject) => {
    newBlogMutation.mutate(newObject)
    togglableRef.current.toggleVisibility()
  }

  const togglableRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
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
        <Blog blog={blog} key={blog.id} />
      )}
    </div>
  )
}

export default ListBlogs
