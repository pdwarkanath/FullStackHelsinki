import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  const handleNameChange = (event) => setNewName(event.target.value) 
  const handleNumberChange = (event) => setnewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  
  const filterRegEx = new RegExp(filter, 'i')
  const filteredPersons = filter === '' ? persons : persons.filter((p) => p.name.match(filterRegEx))

  const handleSubmit = (event) => {
    event.preventDefault()
    const isNameInPersons = persons.reduce((result, person) => result || person.name === newName, false)

    if (isNameInPersons) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newNameObj = {
        name: newName,
        number: newNumber
      }  
      setNewName('')
      setnewNumber('')
      setPersons(persons.concat(newNameObj))
    }
    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange} />
      <h3>Add New</h3>
      <PersonForm handleSubmit = {handleSubmit} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons = {filteredPersons}/>
    </div>
  )
}

export default App