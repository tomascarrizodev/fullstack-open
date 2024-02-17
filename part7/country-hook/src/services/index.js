import axios from 'axios'

const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getData = async (endpoint) => {
  const response = await axios.get(`${countryUrl}${endpoint}`)
  return response.data
}
const objValues = (obj) => Object.values(obj)

export default { getData, objValues }