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
const createComment = (newObject, id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(`${baseUrl}/${id}/comments`, newObject, config)
  return request.then(response => {
    console.log('response:', response)
    return response
  })
    .catch(error => {
      console.error('Error en la solicitud POST:', error)
      throw error
    })
}
const getComment = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`)
  return request.then(response => response.data)
}
const update = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  console.log('newObject:', newObject)
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return request.then(response => response.data)
    .catch(error => {
      console.error('Error en la solicitud PUT:', error)
      throw error
    })
}
const remove = (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
    .catch(error => {
      console.error('Error en la solicitud DELETE:', error)
      throw error
    })
}
export default { getAll, create, setToken, update, remove, createComment, getComment }
