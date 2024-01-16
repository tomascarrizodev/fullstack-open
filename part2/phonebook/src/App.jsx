import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPerson = { name: newName }
    const newPersons = [...persons]
    newPersons.push(newPerson)
    
    // let start = 0

    // while (start < newPersons.length - 1) {
    //   if (newPersons[start].name === newName) {
    //     newPersons.pop()
    //     alert(`${newName} is already in the phonebook`)
    //     start++
    //   } else if (newPersons[start] === newPersons.length - 1) {
    //     setPersons(newPersons)
    //     start++
    //   } else if (newPersons[start].name !== newName && newPersons.length - 1 !== start) {
    //     start++
    //   }
    // }

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
