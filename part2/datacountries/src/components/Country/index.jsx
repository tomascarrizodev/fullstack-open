import countriesServices from '../../services'

const Country = (props) => {
  const { selectedCountry } = props
  const {
    name,
    capital,
    area,
    languages,
    flags
  } = selectedCountry

  const tongues = countriesServices.objValues(languages)

  return (
    <>
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
    </>
  )
}

export default Country