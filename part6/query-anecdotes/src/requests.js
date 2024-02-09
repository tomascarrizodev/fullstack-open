import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = async () => {
  const response = await axios(baseUrl)
  return response.data
}

export const createAnecdote = async (newAnecdote) => {
  if (newAnecdote.content < 5) {
    throw new Error('at least 5')
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

export const updateAnecdote = async (newAnecdote) => {
  const response = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
  return response.data
}