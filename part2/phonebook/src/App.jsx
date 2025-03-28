import { useState } from 'react'
import { Header, Header2 } from './components/Headers'
import Filter from './components/Filter'  
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
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
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
      setNewName('')
      setNewNumber('')
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
