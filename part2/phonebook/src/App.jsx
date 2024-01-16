import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '54-261-3042443', id: 1 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPersons = [...persons]
    const newPerson = { name: newName, number: newNumber, id: newPersons.length + 1 }
    newPersons.push(newPerson)
    
    for (let i = 0; i < newPersons.length - 1; i++) {
      if (newPersons[i].name === newName) {
        newPersons.pop()
        alert(`${newName} is already in the phonebook`)
      } else if (newPersons[i] === newPersons.length - 1) {
        setPersons(newPersons)
        setNewName('')
      }
    }

    setPersons(newPersons)
  }
    
  const handleChange = (e, func) => {
    const val = e.target.value
    func(val)
  }

  console.log(persons)

  return (
    <div>
      <h2>Phonebook</h2>
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
        persons.map(e => {
          return <p key={e.id}>{e.name} {e.number}</p>
        })
      }
    </div>
  )
}

export default App
