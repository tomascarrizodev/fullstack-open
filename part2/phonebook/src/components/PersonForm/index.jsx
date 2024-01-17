import axios from "axios"

const PersonForm = (props) => {

  const { persons, newName, setNewName, newNumber, setNewNumber, setPersons, setFilteredPersons, handleChange } = props

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPersons = [...persons]
    const newPerson = { name: newName, number: newNumber, id: (newPersons.length + 1).toString() }

    let unique = true

    for (let i = 0; i < newPersons.length; i++) {
      if (newPersons[i].name === newName) {
        unique = false
        alert(`${newName} is already in the phonebook`)
      }
    }

    if (unique) {
      setPersons([...newPersons, newPerson])
      setFilteredPersons(newPersons)
      setNewName('')
      setNewNumber('')

      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          console.log(response)
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