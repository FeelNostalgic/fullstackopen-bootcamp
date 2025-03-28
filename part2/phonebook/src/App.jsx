import { useState, useEffect } from 'react'
import { Header, Header2 } from './components/Headers'
import Filter from './components/Filter'  
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from './services/phones'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    phoneService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }
  
  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      const personObject = {name: newName, number: newNumber  }
      phoneService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const filteredPersons = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <Header text='Phonebook' />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Header2 text='Add a new' />
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <Header2 text='Numbers' />
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
