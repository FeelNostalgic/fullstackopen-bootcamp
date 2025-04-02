import { useState } from 'react'
import Button from './Button'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} text={props.buttonLabel} /> 
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} text='cancel' />
      </div>
    </div>
  )
}

export default Togglable