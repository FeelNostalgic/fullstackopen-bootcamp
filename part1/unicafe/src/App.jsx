const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text='good' value={good} />
          <StatisticsLine text='neutral' value={neutral} />
          <StatisticsLine text='bad' value={bad} />
          <StatisticsLine text='all' value={good + neutral + bad} />
          <StatisticsLine text='average' value={((good - bad) / (good + neutral + bad)).toFixed(2)} />
          <StatisticsLine text='positive' value={((good / (good + neutral + bad)) * 100).toFixed(2) + ' %'} />
        </tbody>
      </table>

    </div>
  )
}

const App = ({ store }) => {
  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={() => store.dispatch({ type: 'GOOD' })} text='good' />
      <Button onClick={() => store.dispatch({ type: 'NEUTRAL' })} text='neutral' />
      <Button onClick={() => store.dispatch({ type: 'BAD' })} text='bad' />
      <Header text='statistics' />
      <Statistics good={store.getState().good} neutral={store.getState().neutral} bad={store.getState().bad} />
    </div>
  )
}

export default App
