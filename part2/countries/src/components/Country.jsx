import { Header, Header2 } from './Headers'

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

export default Country