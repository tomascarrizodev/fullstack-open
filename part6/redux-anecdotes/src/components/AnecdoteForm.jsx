import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (e) => {
    e.preventDefault()
    const value = e.target.anecdote.value
    dispatch(createAnecdote(value))
    dispatch(setNotification(`you added "${value}"`, 5))
    e.target.anecdote.value = ''
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm