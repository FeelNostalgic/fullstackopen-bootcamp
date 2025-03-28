import { useState } from 'react'
import { Header, Header2 } from './components/Headers'


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
      <form>
        <div>
          Filter shown with <input value={filter} placeholder='filter shown' onChange={handleFilterChange} />
        </div>
      </form>

      <Header2 text='Add a new' />
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} placeholder='name' onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} placeholder='number' onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header2 text='Numbers' />
      {filteredPersons.map(person => <div key={person.id}>{person.name} {person.number}</div>)} 
    </div>
  )
}

export default App
