import { useState } from 'react'
import { useEffect } from 'react'
import { Header, Header2 } from './components/Headers'
import Countries from './components/Countries'
import countriesService from './services/countries'


function App() {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearch = (event) => {
    setSearchValue(event.target.value.toLowerCase())
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
      <Countries countries={filteredCountries} setSearchValue={setSearchValue}/>
    </div>
  )
}

export default App
