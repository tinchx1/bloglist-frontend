const FormLogin = ({ loginService, username, setUsername, password, setPassword, setUser }) => {
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
      loginService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
    } catch (e) {

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
