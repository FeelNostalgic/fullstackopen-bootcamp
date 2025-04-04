import { useReducer } from 'react'
import CounterContext from './CounterContext'
import Display from './components/Display'
import Button from './components/Button'

const App = () => {
  return (
    <div>
      <CounterContext.Provider value={[counter, counterDispatch]}>
        <Display />
        <div>
          <Button type='INC' label='+' />
          <Button type='DEC' label='-' />
          <Button type='ZERO' label='0' />
        </div>
      </CounterContext.Provider>
    </div>
  )
}

export default App