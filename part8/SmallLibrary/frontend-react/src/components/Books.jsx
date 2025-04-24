import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = () => {
  const [genre, setGenre] = useState('')

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 3000,
    variables: { genre: genre }
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        <span>
          {genre !== ''
            ? <div> in genre <strong>{genre}</strong> </div>
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
          {result.data.allBooks.map((book) => (
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
        <button key={'allGenres'} onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
