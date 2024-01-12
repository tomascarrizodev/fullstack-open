import { useState } from 'react'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick} >
    {text}
  </button>
}

const StatisticsLine = ({ text, value, text2 = '' }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {text2}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props
  return (
    <table>
      <tbody>
        <StatisticsLine text='good' value={good} />
        <StatisticsLine text='neutral' value={neutral} />
        <StatisticsLine text='bad' value={bad} />
        <StatisticsLine text='all' value={all} />
        <StatisticsLine text='average' value={average} />
        <StatisticsLine text='positive' value={positive} text2={'%'} />
      </tbody>
    </table>
  )
}

const Paragraph = ({ text }) => <p>{text}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleClick = (score) => {
    const newAll = all + 1
    setAll(newAll)
    let newGood = good
    let newNeutral = neutral
    let newBad = bad
    if (score === 'good') {
      newGood = good + 1
      setGood(newGood)
    } else if (score === 'neutral') {
      newNeutral = neutral + 1
      setNeutral(newNeutral)
    } else {
      newBad = bad + 1
      setBad(newBad)
    }
    handleAverage(newGood, newBad, newAll)
    handlePositive(newGood, newAll)
  }

  const handleAverage = (newG, newB, newA) => {
    const goodMinusBad = newG - newB
    const newAverage = goodMinusBad / newA
    setAverage(newAverage)
  }

  const handlePositive = (newG, newA) => {
    const newPositive = (newG / newA) * 100
    setPositive(newPositive)
  }

  const restart = () => {
    setGood(0)
    setNeutral(0)
    setBad(0)
    setAll(0)
    setAverage(0)
    setPositive(0)
  }

  return (
    <div>
      <Title text='give feedback' />
      <Button text="good" handleClick={() => handleClick('good')} />
      <Button text="neutral" handleClick={() => handleClick('neutral')} />
      <Button text="bad" handleClick={() => handleClick('bad')} />
      <button onClick={restart}>restart</button>
      <Title text='statistics' />
      {
        all === 0 ?
          <Paragraph text='No feedback given' /> :
          <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
      }
    </div>
  )
}

export default App
