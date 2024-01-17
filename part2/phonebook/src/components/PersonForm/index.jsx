import personsService from '../../services/persons'

const PersonForm = (props) => {

  const { 
    persons, 
    newName, 
    setNewName, 
    newNumber, 
    setNewNumber, 
    setPersons, 
    setFilteredPersons, 
    handleChange,
    setNoti,
    setMessage,
    setNotiStyle,
    notiStyles 
  } = props

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPersons = [...persons]
    const newPerson = { name: newName, number: newNumber, id: (newPersons.length + 1).toString() }

    let unique = true

    for (let i = 0; i < newPersons.length; i++) {
      if (newPersons[i].name === newName) {
        unique = false
        if (window.confirm(`"${newPersons[i].name}" is already added, replace the old number with a new number?`)) {
          personsService
            .update(newPersons[i].id, newPerson)
            .then(returnedObject => {
              setPersons(persons.map(person => person.id !== newPersons[i].id ? person : returnedObject))
              setNewName('')
              setNewNumber('')
              setNoti(true)
              setMessage(`Number changed for "${returnedObject.name}"`)
              setNotiStyle(notiStyles.notification)
            })
            .catch(err => {
              console.log(err)
              setNoti(true)
              setMessage(`Failed to change number for "${newPerson.name}"`)
              setNotiStyle(notiStyles.error)
            })
        }
      }
    }

    if (unique) {
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(newPersons)
          setNewName('')
          setNewNumber('')
          setNoti(true)
          setMessage(`Added "${returnedPerson.name}"`)
          setNotiStyle(notiStyles.notification)
        })
        .catch(err => {
          console.log(err)
          setNoti(true)
          setMessage(`Faild to add "${newPerson.name}" to phonebook`)
          setNotiStyle(notiStyles.error)
        })
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} >
        <div>
          name: <input value={newName} onChange={e => handleChange(e, setNewName)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={e => handleChange(e, setNewNumber)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm