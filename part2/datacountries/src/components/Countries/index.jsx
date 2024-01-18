
const Countries = (props) => {
  const { filteredCountries } = props

  return (
    <>
      {
        filteredCountries.map(country => {
          return <p key={country}>{country.charAt(0).toUpperCase() + country.slice(1)}</p>
        })
      }
    </>
  )
}

export default Countries