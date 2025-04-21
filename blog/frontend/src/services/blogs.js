import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  const response = await request
  return response.data
}

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, blogObject, config)
  const response = await request
  return response.data
}

const update = async (id, blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, blogObject, config)
  const response = await request
  return response.data
}

const comment = async (id, comment) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const body = {
    comment
  }

  const request = axios.post(`${baseUrl}/${id}/comments`, body, config)
  const response = await request
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}
export default { getAll, setToken, create, update, comment, remove }