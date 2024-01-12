import { useState } from 'react'

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Title = ({ text }) => <h1>{text}</h1>

const Paragraph = ({ text }) => <p>{text}</p>

const App = () => {

  const [data, setData] = useState({
    popular: {
      votes: 0,
      anecdote: 'If it hurts, do it more often.'
    },
    selected: 0,
    anecdotes: [
      {
        votes: 0,
        anecdote: 'If it hurts, do it more often.'
      },
      {
        votes: 0,
        anecdote: 'Adding manpower to a late software project makes it later!'
      },
      {
        votes: 0,
        anecdote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'
      },
      {
        votes: 0,
        anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'
      },
      {
        votes: 0,
        anecdote: 'Premature optimization is the root of all evil.'
      },
      {
        votes: 0,
        anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
      },
      {
        votes: 0,
        anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
      },
      {
        votes: 0,
        anecdote: 'The only way to go fast, is to go well.'
      },
    ]
  })

  const handleSelected = () => {
    const random = Math.floor(Math.random() * 8)
    if (random !== data.selected)
      setData((prev) => prev = { ...prev, selected: random })
    else
      handleSelected()
  }

  const handleVote = () => {
    setData((prev) => {
      const updateAnecdotes = prev.anecdotes.map((e, i) => {
        if (i === prev.selected)
          return { votes: e.votes + 1, anecdote: e.anecdote }
        else
          return e
      })

      const prevPopVotes = prev.popular.votes
      const newPopVotes = updateAnecdotes[prev.selected].votes

      if (newPopVotes >= prevPopVotes)
        return prev = { ...prev, popular: updateAnecdotes[prev.selected], anecdotes: updateAnecdotes }
      else
        return prev = { ...prev, anecdotes: updateAnecdotes }
    })
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Paragraph text={data.anecdotes[data.selected].anecdote} />
      <Paragraph text={`has ${data.anecdotes[data.selected].votes} votes`} />
      <Button
        text='vote'
        handleClick={handleVote}
      />
      <Button
        text='next anecdote'
        handleClick={handleSelected}
      />
      <Title text="Anecdote with most votes" />
      <Paragraph text={data.popular.anecdote} />
      <Paragraph text={`has ${data.popular.votes} votes`} />
    </div>
  )
}

export default App