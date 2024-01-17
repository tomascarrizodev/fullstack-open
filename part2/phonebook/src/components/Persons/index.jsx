import { useEffect } from "react"
import personsService from "../../services/persons"

const Persons = ({ filteredPersons, setFilteredPersons, persons }) => {
  useEffect(() => {
    setFilteredPersons(persons)
  }, [persons])

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      personsService
        .erase(id)
          .then(response => response)
          .catch(err => console.log(err))
      setFilteredPersons(persons)
    }
  }

  return (
    <>
      {
        filteredPersons.length ?
        filteredPersons.map(e => {
            return (
              <div key={e.name}>
                <span>{e.name} - {e.number}</span> 
                <button onClick={() => handleDelete(e.id, e.name)}>delete</button>
              </div>
            )
          }) :
          <p>No matches</p>
      }
    </>
  )
}

export default Persons