import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorBirthYearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  }
  )

  const authors = useQuery(ALL_AUTHORS)

  useEffect(() => {
    setName(authors.data.allAuthors[0].name)
  }, [authors])

  const submit = (event) => {
    event.preventDefault()
        
    editAuthor({ variables: { name, born: Number(born) } })

    setBorn('')
  }

  if(authors.loading){
    return(
      <div>loading...</div>
    )
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select onChange={({ target }) => setName(target.value)} value={name}>
            {authors.data.allAuthors.map((author) => (
              <option 
              key={author.name} 
              value={author.name}
              >
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>born:</label>
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default AuthorBirthYearForm
