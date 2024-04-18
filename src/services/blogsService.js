import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs/'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => {
    return response
  })
    .catch(error => {
      console.error('Error en la solicitud POST:', error)
      throw error
    })
}
export default { getAll, create, setToken }
