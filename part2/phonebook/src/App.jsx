import { useState, useEffect } from 'react'
import { Header, Header2 } from './components/Headers'
import Filter from './components/Filter'  
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
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
