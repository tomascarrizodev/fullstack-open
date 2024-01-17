import { useEffect } from "react"

const Persons = ({ filteredPersons, setFilteredPersons, persons }) => {
  useEffect(() => {
    setFilteredPersons(persons)
  }, [persons])
  return (
    <>
      {
        filteredPersons.length ?
        filteredPersons.map(e => {
            return <p key={e.id}>{e.name} {e.number}</p>
          }) :
          <p>No matches</p>
      }
    </>
  )
}

export default Persons