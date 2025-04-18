import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
      if (!name) return
  
      const fetchCountry = async () => {
        try {
          const response = await axios.get(
            `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
          )
  
          const countryData = response.data
  
          setCountry({
            data: {
              name: countryData.name.common,
              capital: countryData.capital[0],
              population: countryData.population,
              flag: countryData.flags.png
            },
            found: true
          })
        } catch (error) {
          setCountry({ found: false })
        }
      }
  
      fetchCountry()
    }, [name])
  
    return country
  }