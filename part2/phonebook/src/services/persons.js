import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  const request = axios.get(baseUrl)
  return await request.then(response => response.data)
}

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return await request.then(response => response.data)
}

const erase = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return await request.then(response => response)
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return await request.then(response => response.data)
}

export default { getAll, create, erase, update }