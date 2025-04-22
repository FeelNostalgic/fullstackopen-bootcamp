import {useState} from 'react'
import { useQuery } from '@apollo/client'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import Notify from './components/Notify'

import { ALL_PERSONS } from './queries'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <h2>Create person</h2>
      <PersonForm setError={notify} />
      <h2>Change number</h2>
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App

