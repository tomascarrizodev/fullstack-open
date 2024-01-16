import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '54-261-3042443', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

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
  
  const handleSearch = (val) => {
    const value = val.trim().toLowerCase()
    const newFilter = [...persons]
    const lower = newFilter.map(e => {
      return {...e, name: e.name.toLowerCase()}
    })
    const positions = []
    const filtered = []

    for (let i = 0; i < lower.length; i++) {
      if (lower[i].name.includes(value))
        positions.push(i)
    }

    for (let j = 0; j < newFilter.length; j++) {
      filtered.push(newFilter[positions[j]])
    }

    const newFilt = filtered.filter(e => e !== undefined)
    setFilteredPersons(newFilt)

    if (value === '') {
      setFilteredPersons(persons)
    }
  }

  const handleChange = (e, func) => {
    const val = e.target.value
    func(val)
    if (e.target.parentNode.innerText.includes('filter')) {
      handleSearch(val)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={search} onChange={e => handleChange(e, setSearch)} />
      </div>
      <h2>Add a new</h2>
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
      <h2>Numbers</h2>
      {
        filteredPersons.length ?
          filteredPersons.map(e => {
            return <p key={e.id}>{e.name} {e.number}</p>
          }) : 
          <p>No matches</p>
      }
    </div>
  )
}

export default App
