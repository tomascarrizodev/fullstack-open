const Filter = (props) => {

  const { persons, filter, setFilter, setFilteredPersons, handleChange } = props

  const handleFilter = (val) => {
    const value = val.trim().toLowerCase()
    const newFilter = [...persons]
    const lower = newFilter.map(e => {
      return { ...e, name: e.name.toLowerCase() }
    })
    const positions = []
    const filtered = []

    for (let i = 0; i < lower.length; i++) {
      if (lower[i].name.includes(value))
        positions.push(i)
    }

    for (let j = 0; j < newFilter.length; j++) {
      filtered.push(newFilter[positions[j]])
    }

    const newFilt = filtered.filter(e => e !== undefined)
    setFilteredPersons(newFilt)

    if (value === '') {
      setFilteredPersons(persons)
    }
  }

  return (
    <>
      filter shown with <input value={filter} onChange={e => {
          handleChange(e, setFilter)
          handleFilter(e.target.value)
        }} 
      />
    </>
  )
}

export default Filter