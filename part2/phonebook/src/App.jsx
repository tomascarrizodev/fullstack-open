import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '54-261-3042443', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

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

      <Persons filteredPersons={filteredPersons} />

    </div>
  )
}

export default App
