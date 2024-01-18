import axios from 'axios'

const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const api_key = import.meta.env.VITE_SOME_KEY

const getData = async (endpoint) => {
  const request = axios.get(`${countryUrl}${endpoint}`)
  return await request.then(res => res.data)
}

const objValues = (obj) => Object.values(obj)

const getWeather = async (lat, lon) => {
  const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${api_key}`
  const request = axios.get(weatherUrl)
  return await request.then(res => res.data)

}

export default { getData, objValues, getWeather }