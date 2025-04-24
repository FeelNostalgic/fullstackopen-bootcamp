import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = () => {
  const [genre, setGenre] = useState('all genres')

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 3000
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const filteredBooks = () => {
    return result.data.allBooks.filter((book) => {
      return genre === 'all genres' || book.genres.includes(genre)
    })
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        <span>
          {genre !== 'all genres' 
            ? <div>
              in genre <strong>{genre}</strong>
            </div>
            : null
          }
        </span>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks().map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {
          result.data.allGenres.map((genre) => (
            <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
          ))
        }
        <button key={'allGenres'} onClick={() => setGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
