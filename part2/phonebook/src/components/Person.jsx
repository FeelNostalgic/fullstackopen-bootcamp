const Person = ({ person }) => {
  return (
    <div className="person-card" style={{
      padding: '10px',
      margin: '5px 0',
      backgroundColor: '#f8f9fa',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      {person.name}
    </div>
  )
}

export default Person 