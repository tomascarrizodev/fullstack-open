import { useSelector, useDispatch } from "react-redux"
import { upVoteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.includes(state.filter))
  })
  const dispatch = useDispatch()
  const vote = (id) => {
    const anecdoteVoted = anecdotes.find(a => a.id === id)
    dispatch(upVoteAnecdote({ ...anecdoteVoted, votes: anecdoteVoted.votes + 1 }))
    dispatch(setNotification(`you voted "${anecdoteVoted.content}"`, 5))
  }
  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList