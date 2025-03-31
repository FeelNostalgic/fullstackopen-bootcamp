import axios from 'axios'

const apiUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherAPIurl = 'https://openweathermap.org/'

const getAllCountries = () => {
    const request = axios.get(`${apiUrl}/all`)
    return request.then(response => response.data)
}

export default { getAll: getAllCountries }