import { useState } from 'react'
import { Header2 } from './components/Headers'


const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <Header2 text='Phonebook' />
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} placeholder='name' onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} placeholder='number' onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header2 text='Numbers' />
      {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)} 
    </div>
  )
}

export default App
