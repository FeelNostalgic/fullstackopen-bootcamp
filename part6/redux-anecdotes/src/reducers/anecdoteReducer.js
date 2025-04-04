import { createSlice, current } from '@reduxjs/toolkit'  

const generateId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
    id: generateId()
  }
}

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState:[],
    reducers: {
      createAnecdote(state, action) {
        const newAnecdote = asObject(action.payload)
        state.push(newAnecdote)
      },
      vote(state, action) {
        const id = action.payload        
        const anecdote = state.find(anecdote => anecdote.id === id)
        anecdote.votes = anecdote.votes + 1
        console.log(current(state))
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    }
  })

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer