/* eslint-disable no-case-declarations */
import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'

const anecdotesAtStart = {
  anecdotes: [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ],
  filter: '',
  notification: null
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initialState = anecdotesAtStart.anecdotes.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      return state.map(a => a.id !== action.payload.id ? a : action.payload).sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const allAnecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(allAnecdotes))
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const upVoteAnecdote = (obj) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update(obj.id, obj)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer