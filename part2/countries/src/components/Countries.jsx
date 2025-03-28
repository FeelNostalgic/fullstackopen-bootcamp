import Country from './Country'
import Button from './Button'

const handleShow = (name, setSearchValue) => {
    setSearchValue(name.toLowerCase())
}

const CountryList = ({ countries, setSearchValue }) => {
    return (
        <div>
            {countries.map(country => (
                <div key={country.name.common}>
                    {country.name.common}
                    <Button onClick={() => handleShow(country.name.common, setSearchValue)} text={'Show'}></Button>
                </div>
            ))}
        </div>
    )
}

const Countries = ({ countries, setSearchValue }) => {
    if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>
    }
  
    if (countries.length === 1) {
      return <Country country={countries[0]} />
    }
  
    return (
      <div>
        <CountryList countries={countries} setSearchValue={setSearchValue} />
      </div>
    )
  }

export default Countries