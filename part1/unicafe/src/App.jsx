import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  return(
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
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
