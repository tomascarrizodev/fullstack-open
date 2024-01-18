import { useEffect, useState } from 'react'
import countriesServices from '../../services'

const Country = (props) => {
  const [temp, setTemp] = useState('')
  const [wind, setWind] = useState('')
  const { selectedCountry, setSelectedCountry, setShowCountry } = props
  const {
    name,
    capital,
    area,
    languages,
    flags,
    capitalInfo
  } = selectedCountry

  useEffect(() => {
    countriesServices
      .getWeather(capitalInfo.latlng[0], capitalInfo.latlng[1])
      .then(res => {
        setTemp(res.current.temp)
        setWind(res.current.wind_speed)
      })
      .catch(err => console.log(err))
  }, [])

  const tongues = countriesServices.objValues(languages)

  return (
    <>
      <button 
        onClick={() => {
          setSelectedCountry(null)
          setShowCountry(false)
        }}
      >
        return
      </button>
      <h2>{name.common}</h2>
      <p>capital: {capital[0]}</p>
      <p>area: {area}</p>
      <h4>languages: </h4>
      <ul>
        {
          tongues.map((lang) => {
            return <li key={lang}>{lang}</li>
          })
        }
      </ul>
      <picture>
        <img src={flags.png} alt={flags.alt ? flags.alt : `${name.common}' flag`} />
      </picture>
      <h3>Weather in {capital[0]}</h3>
      <p>temperature {temp} C°</p>
      <p>wind {wind} m/s</p>
    </>
  )
}

export default Country