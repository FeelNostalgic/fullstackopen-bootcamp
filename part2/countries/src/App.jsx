import { useState } from 'react'
import { useEffect } from 'react'
import { Header, Header2 } from './components/Headers'

import countriesService from './services/countries'

const Country = ({ country }) => {
  return (
    <div>
      <Header text={country.name.common}></Header>
      <p>
        <div>Capital {country.capital[0]}</div>
        <div>Area {country.area} </div>
      </p>
      <Header2 text='languages'></Header2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
    </div>
  )
}

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common}>{country.name.common}</div>
      ))}
    </div>
  )
}

function App() {
  const [searchValue, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
  }

  useEffect(() => {
    countriesService.getAll().then(countries => {
      setCountries(countries)
    })
  }, [])

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchValue))

  return (
    <div>
      <form>
        <input type="text" placeholder="Search for a country" value={searchValue} onChange={handleSearch} />
      </form>
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App
