import { useEffect, useState } from 'react'
import countriesService from './services'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [allNames, setAllNames] = useState([])
  const [inputCountry, setInputCountry] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [showCountry, setShowCountry] = useState(false)

  useEffect(() => {
    countriesService
      .getData('all')
      .then(countries => {
        setAllCountries(countries)
        setAllNames(countries.map(country => country.name.common.toLowerCase()))
        setFilteredCountries(countries.map(country => country.name.common.toLowerCase()))
      })
      .catch(err => console.log(err))
  }, [])

  const handleChange = (e) => {
    const val = e.target.value.toLowerCase()
    setInputCountry(val)
    setFilteredCountries(allNames.filter(country => country.includes(val)))
  }

  const handleShow = (name) => {
    setSelectedCountry(...allCountries.filter(country => country.name.common.toLowerCase().includes(name)))
    setShowCountry(true)
  }

  return (
    <>
      <form>
        <div>
          find countries <input value={inputCountry} onChange={(e) => handleChange(e)} />
        </div>
      </form>
      {
        filteredCountries.length > 10 || filteredCountries.length === 250 && showCountry === false ?
          <p>Too many matches, specify another filter</p> : null
      }
      {
        filteredCountries.length === 0 && selectedCountry === null ?
          <p>No available countries</p> : null
      }
      {
        allNames.length === 0 && selectedCountry === null ?
        <p>loading...</p> : null 
      }
      {
        filteredCountries.length <= 10 && filteredCountries.length > 0 && selectedCountry === null ?
          <Countries 
            filteredCountries={filteredCountries} 
            handleShow={handleShow}
          /> : 
          null
      }
      {
        selectedCountry ?
          <Country 
            selectedCountry={selectedCountry} 
            setSelectedCountry={setSelectedCountry} 
            setShowCountry={setShowCountry}
          /> : 
          null
      }
    </>
  )
}

export default App
