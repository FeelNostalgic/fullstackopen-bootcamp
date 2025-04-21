import { useState, forwardRef, useImperativeHandle } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className="my-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div style={hideWhenVisible}>
        <div className='flex'>
          <Button onClick={toggleVisibility} text={props.buttonLabel} className='bg-blue-300 hover:bg-blue-400 text-black font-medium py-2 px-10 rounded transition-colors mx-auto' />
        </div>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div className='mt-4'>
          <Button onClick={toggleVisibility} text='Cancel' className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-10 rounded transition-colors' />
        </div>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable