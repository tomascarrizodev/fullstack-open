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
  // const [limit, setLimit] = useState([0, 10])

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

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(...allCountries.filter(country => country.name.common.toLowerCase().includes(filteredCountries[0])))
    }
    return () => false
  }, [filteredCountries])

  const handleChange = (e) => {
    const val = e.target.value.toLowerCase()
    setInputCountry(val)
    setFilteredCountries(allNames.filter(country => country.includes(val)))
  }

  return (
    <>
      <form>
        <div>
          find countries <input value={inputCountry} onChange={(e) => handleChange(e)} />
        </div>
      </form>
      {
        filteredCountries.length > 10 || filteredCountries.length === 250 ?
          <p>Too many matches, specify another filter</p> : null
      }
      {
        filteredCountries.length === 0 ?
          <p>No available countries</p> : null
      }
      {
        allNames.length ?
          null : <p>loading...</p>
      }
      {
        filteredCountries.length <= 10 && filteredCountries.length > 0 && filteredCountries.length !== 1 ?
          <Countries filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} /> : null
      }
      {
        filteredCountries.length === 1 && selectedCountry ?
          <Country selectedCountry={selectedCountry} /> : null
      }
    </>
  )
}

export default App
