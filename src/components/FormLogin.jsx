import { useContext } from 'react'
import blogsService from '../services/blogsService'
import loginService from '../services/loginService'
import UserContext from '../UserContext'
const FormLogin = ({ notificationDispatch, username, setUsername, password, setPassword }) => {
  const [, userDispatch] = useContext(UserContext)
  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const user = await loginService.login({
        username,
        password
      })
      setUsername('')
      setPassword('')
      userDispatch({ data: user, type: 'SET_USER' })
      blogsService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
    } catch (e) {
      notificationDispatch({ data: 'Wrong credentials', type: 'SET_NOTIFICATION' })
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE_NOTIFICATION' })
      }, 5000)
    }
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label>username</label>
        <input
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          type='text'
        />
        <br />
        <label>password</label>
        <input
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type='password'
        />
        <br />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}
export default FormLogin
