import { Header2 } from "./Headers"

const NoteForm = ({ onSubmit, handleChange, value}) => {
    return (
      <div>
        <Header2 text='Create a new note' />
  
        <form onSubmit={onSubmit}>
          <input
            value={value}
            onChange={handleChange}
          />
          <button type="submit">save</button>
        </form>
      </div>
    )
  }

export default NoteForm