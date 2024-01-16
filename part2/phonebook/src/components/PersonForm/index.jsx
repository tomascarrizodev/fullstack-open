const PersonForm = (props) => {

  const { persons, newName, setNewName, newNumber, setNewNumber, setPersons, setFilteredPersons, handleChange } = props

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPersons = [...persons]
    const newPerson = { name: newName, number: newNumber, id: newPersons.length + 1 }
    newPersons.push(newPerson)

    for (let i = 0; i < newPersons.length - 1; i++) {
      if (newPersons[i].name === newName) {
        newPersons.pop()
        alert(`${newName} is already in the phonebook`)
      }
    }

    setPersons(newPersons)
    setFilteredPersons(newPersons)
    setNewName('')
    setNewNumber('')
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