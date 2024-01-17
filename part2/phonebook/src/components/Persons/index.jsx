import { useEffect } from "react"
import personsService from "../../services/persons"

const Persons = ({ filteredPersons, setFilteredPersons, setPersons, persons, setNoti, setMessage, setNotiStyle, notiStyles }) => {
  useEffect(() => {
    setFilteredPersons(persons)
  }, [persons])

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      personsService
        .erase(id)
          .then(response => {
            setPersons(persons.filter(person => person.name !== response.data.name))
            setNoti(true)
            setMessage(`Removed "${response.data.name}" from phonebook`)
            setNotiStyle(notiStyles.notification)
          })
          .catch(err => {
            console.log(err)
            setNoti(true)
            setMessage(`Information of "${name}" has already been removed from server. Please refresh the page`)
            setNotiStyle(notiStyles.error)
          })
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