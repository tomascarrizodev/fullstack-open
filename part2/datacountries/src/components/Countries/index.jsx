
const Countries = (props) => {
  const { filteredCountries, handleShow } = props

  return (
    <>
      {
        filteredCountries.map(country => {
          return (
            <div key={country}>
              <span>{country.charAt(0).toUpperCase() + country.slice(1)}</span>
              <button onClick={() => handleShow(country)}>show</button>
            </div>
          )
        })
      }
    </>
  )
}

export default Countries