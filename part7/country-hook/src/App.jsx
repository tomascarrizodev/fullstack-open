import { useEffect, useState } from 'react'
import countriesService from './services'
import Countries from './components/Countries'
import Country from './components/Country'
import { useCountry } from './hooks'

function App() {
  const {
    value = '',
    setValue,
    filtered,
    setCountries,
    show,
    onShow,
    selected,
    onGoBack,
  } = useCountry()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    countriesService
      .getData('all')
      .then(countries => setCountries(countries))
      .then(() => setLoading(false))
      .catch(err => console.log(err))
  }, [])

  const handleChange = (e) => setValue(e.target.value.toLowerCase())
  const handleShow = (name) => onShow(name)

  return (
    <>
      <form>
        <div>
          find countries <input value={value} onChange={(e) => handleChange(e)} />
        </div>
      </form>
      {
        (filtered.length > 10 || filtered.length === 250 && show === false) &&
        <p>Too many matches, specify another filter</p>
        ||
        loading && <p>loading...</p>
        ||
        (filtered.length === 0 && selected === null) && <p>No available countries</p>
        ||
        (filtered.length <= 10 && filtered.length > 0 && selected === null) &&
        <Countries
          filtered={filtered}
          handleShow={handleShow}
        />
        ||
        selected &&
        <Country
          selected={selected}
          onGoBack={onGoBack}
        />
      }
    </>
  )
}

export default App
