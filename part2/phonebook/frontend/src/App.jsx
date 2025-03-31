import { useState, useEffect } from 'react'
import { Header, Header2 } from './components/Headers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from './services/phonebook'
import Notification from './components/Notification'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
      if (window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        phoneService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(null)
            setSuccessMessage(`Updated ${newName}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
      }
    } else {
      const personObject = { name: newName, number: newNumber }
      phoneService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${newName}`)
          setErrorMessage(null)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneService
        .remove(id)
        .then(_ => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(_ => {
          setSuccessMessage(null)
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const filteredPersons = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <Header text='Phonebook' />
      <Notification message={successMessage} className='success' />
      <Notification message={errorMessage} className='error' />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Header2 text='Add a new' />
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <Header2 text='Numbers' />
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
