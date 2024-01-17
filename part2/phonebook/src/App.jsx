import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleChange = (e, func) => {
    const val = e.target.value
    func(val)
  }

  return (
    <div>
      <h2>Phonebook</h2>

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
        setFilteredPersons={setFilteredPersons}
      />

    </div>
  )
}

export default App
