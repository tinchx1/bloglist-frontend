import blogsService from '../services/blogsService'
import loginService from '../services/loginService'
const FormLogin = ({ setNotification, username, setUsername, password, setPassword, setUser }) => {
  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const user = await loginService.login({
        username,
        password
      })
      setUsername('')
      setPassword('')
      setUser(user)
      blogsService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
    } catch (e) {
      console.log(e)
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
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
