const Filter = ({ filter, handleFilterChange }) => {
  return (
    <form>
      <div>Filter shown with <input value={filter} placeholder='filter shown' onChange={handleFilterChange} /></div>
    </form>
  )
}

export default Filter