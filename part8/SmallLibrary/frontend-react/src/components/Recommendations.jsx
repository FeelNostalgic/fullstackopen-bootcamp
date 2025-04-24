import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = () => {
  const { data: meData, loading: meLoading } = useQuery(ME)
  const genre = meData?.me?.favoriteGenre
  
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre, // Solo ejecuta cuando genre tiene valor
    pollInterval: 3000,
  })
  
  if (meLoading || booksLoading) return <div>loading...</div>

  return(
    <div>
      <h2>Recomendations</h2>
      <div>
        books in your favorite genre <strong>{genre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData.allBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations