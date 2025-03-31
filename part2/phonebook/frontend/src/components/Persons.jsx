import Button from './Button'

const Persons = ({ persons, handleDelete }) => {
    return (
        <div>
            {persons.map(person => 
            <div key={person.id}>
                {person.name} {person.number} <Button onClick={() => handleDelete(person.id)} text={'delete'}></Button>
            </div>)}
        </div>
    )
}

export default Persons