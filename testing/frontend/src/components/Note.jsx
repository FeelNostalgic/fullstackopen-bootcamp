
import Button from './Button'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <span>{note.content}</span>
      <Button onClick={toggleImportance} text={label}></Button>
    </li>)
  }
  
export default Note