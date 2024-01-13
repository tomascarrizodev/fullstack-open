import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPersons = [ ...persons, { name: newName } ]
    setPersons(newPersons)
    setNewName('')
  }

  const handleChange = (e) => {
    const val = e.target.value
    setNewName(val)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(e) => handleSubmit(e)} >
        <div>
          name: <input value={newName} onChange={e => handleChange(e)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(e => {
          return <p key={e.name}>{e.name}</p>
        })
      }
    </div>
  )
}

export default App
