
import Button from './Button'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      {note.content}
      <Button onClick={toggleImportance} text={label}></Button>
    </li>)
  }
  
export default Note