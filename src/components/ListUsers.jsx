import { Link } from 'react-router-dom'

const ListUsers = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <strong>blogs created</strong>
      <ul>
        {users.map(user =>
          <li key={user._id}>
            <Link to={`/users/${user._id}`}><span>{user.username}</span></Link> <span>{user.blogs.length}</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default ListUsers
