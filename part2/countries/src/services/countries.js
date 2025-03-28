import axios from 'axios'
// const baseUrl = 'http://localhost:3001/countries'
const apiUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(`${apiUrl}/all`)
    return request.then(response => response.data)
}

// const create = newObject => {
//     const request = axios.post(baseUrl, newObject)
//     return request.then(response => response.data)
// }

// const update = (id, newObject) => {
//     const request = axios.put(`${baseUrl}/${id}`, newObject)
//     return request.then(response => response.data)
// }

export default { getAll }