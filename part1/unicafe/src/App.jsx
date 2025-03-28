import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  if(good + neutral + bad === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {((good - bad) / (good + neutral + bad)).toFixed(2)}</p>
      <p>positive {((good / (good + neutral + bad)) * 100).toFixed(2)}%</p>
    </div>
  )
}

function App() {
  const [goodValue, setGood] = useState(0)
  const [neutralValue, setNeutral] = useState(0)
  const [badValue, setBad] = useState(0)

  const handleGoodClick = () => setGood(goodValue + 1)
  const handleNeutralClick = () => setNeutral(neutralValue + 1)
  const handleBadClick = () => setBad(badValue + 1)

  return (
    <div>
    <Header text='give feedback' />
    <Button onClick={handleGoodClick} text='good' />
    <Button onClick={handleNeutralClick} text='neutral' />
    <Button onClick={handleBadClick} text='bad' />
    <Header text='statistics' />
    <Statistics good={goodValue} neutral={neutralValue} bad={badValue} />
  </div>
  )
}

export default App
