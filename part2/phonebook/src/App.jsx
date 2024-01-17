import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [message, setMessage] = useState(false)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setMessage(false)
    }, 5000)
    return () => false
  }, [message])

  const handleChange = (e, func) => {
    const val = e.target.value
    func(val)
  }

  const added = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {
        message ?
          <div style={added}>
            Added {persons[persons.length - 1].name}
          </div> :
          null
      }

      <Filter
        persons={persons}
        filter={filter}
        filteredPersons={filteredPersons}
        setFilter={setFilter}
        setFilteredPersons={setFilteredPersons}
        handleChange={handleChange}
      />

      <h2>Add a new</h2>

      <PersonForm
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setMessage={setMessage}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        setFilteredPersons={setFilteredPersons}
        handleChange={handleChange}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        filteredPersons={filteredPersons}
        setPersons={setPersons}
        setFilteredPersons={setFilteredPersons}
      />

    </div>
  )
}

export default App
