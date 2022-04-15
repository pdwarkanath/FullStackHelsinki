import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
      personService.getAll()
      .then(data => setPersons(data))
  }, [])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  const handleNameChange = (event) => setNewName(event.target.value) 
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  
  const filterRegEx = new RegExp(filter, 'i')
  const filteredPersons = filter === '' ? persons : persons.filter((p) => p.name.match(filterRegEx))

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (newName.length === 0 || newNumber.length === 0) {
      return
    }     
    const newNameInPersons = persons.filter(p => p.name === newName)
    
    if (newNameInPersons.length !== 0) {
      if (window.confirm(`${newName} is already added to phonebook. Replace number?`)) {
        const id = newNameInPersons[0].id
        personService.update(id, newPerson).then(person => {
          setPersons(persons.map(p => p.id !== person.id ? p : person))
        })
      }
    } else {
      personService.create(newPerson).then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDelete = (id, name) => {
      if (window.confirm(`Are you sure you want to delete ${name}`)) {
        personService.deletePerson(id).then(res => {
          console.log(`deleted ${id}`)
          setPersons(persons.filter(p => p.id !== id))
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange} />
      <h3>Add New</h3>
      <PersonForm handleSubmit = {handleSubmit} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons = {filteredPersons} handleDelete = {handleDelete} />
    </div>
  )
}

export default App