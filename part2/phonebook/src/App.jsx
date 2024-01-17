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
  const [noti, setNoti] = useState(false)
  const [message, setMessage] = useState('')
  const [notiStyle, setNotiStyle] = useState({})

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
      setNoti(false)
      setMessage('')
      setNotiStyle({})
    }, 5000)
    return () => false
  }, [noti])

  const handleChange = (e, func) => {
    const val = e.target.value
    func(val)
  }

  const notification = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  const error = {
    ...notification,
    color: "red"
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {
        noti ?
          <div style={notiStyle}>
            {message}
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
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setFilteredPersons={setFilteredPersons}
        handleChange={handleChange}
        setNoti={setNoti}
        setMessage={setMessage}
        notiStyles={{notification, error}}
        setNotiStyle={setNotiStyle}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        filteredPersons={filteredPersons}
        setPersons={setPersons}
        setFilteredPersons={setFilteredPersons}
        setNoti={setNoti}
        setMessage={setMessage}
        notiStyles={{notification, error}}
        setNotiStyle={setNotiStyle}
      />

    </div>
  )
}

export default App
