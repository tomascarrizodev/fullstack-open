import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getData = async (endpoint) => {
  const request = axios.get(`${baseUrl}${endpoint}`)
  return await request.then(res => res.data)
}

const objValues = (obj) => Object.values(obj)

export default { getData, objValues }