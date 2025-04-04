import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return [...anecdotes]
            .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
    })

    const voteAnecdote = (id) => {
        dispatch(vote(id))
        dispatch(setNotification(`you voted '${id}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
