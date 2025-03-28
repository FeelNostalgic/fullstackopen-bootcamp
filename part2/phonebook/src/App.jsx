import { useState } from 'react'
import { Header2 } from './components/Headers'


const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    setPersons(persons.concat({ name: newName }))
    setNewName('')
  }

  return (
    <div>
      <Header2 text='Phonebook' />
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} placeholder='name' onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header2 text='Numbers' />
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App
