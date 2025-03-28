const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson: onSubmitHandler }) => {
    return (
        <form onSubmit={onSubmitHandler}>
            <div>name: <input value={newName} placeholder='name' onChange={handleNameChange} /></div>
            <div>number: <input value={newNumber} placeholder='number' onChange={handleNumberChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm