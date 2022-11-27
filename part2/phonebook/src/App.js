import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
      personService.getAll()
      .then(data => setPersons(data))
  }, [])
  
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('')
  
  const handleFilterChange = (event) => setFilter(event.target.value)
  
  const filterRegEx = new RegExp(filter, 'i')
  const filteredPersons = filter === '' ? persons : persons.filter((p) => p.name.match(filterRegEx))

  const handleSubmit = (event) => {
    event.preventDefault()
    const newName = event.target.name.value
    const newNumber = event.target.number.value
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
          setNotificationStyle('success')
          setNotification(`${person.name}'s number was updated`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }).catch(error => {
          setNotificationStyle('error')
          setNotification(error.response.data.error)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
      }
    } else {
      personService.create(newPerson).then(person => {
          setPersons(persons.concat(person))
          setNotificationStyle('success')
          setNotification(`${person.name} was added`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }).catch(error => {
          setNotificationStyle('error')
          setNotification(error.response.data.error)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const handleDelete = (id, name) => {
      if (window.confirm(`Are you sure you want to delete ${name}`)) {
        personService.deletePerson(id)
        .then(res => {
          console.log(`deleted ${id}`)
          setNotificationStyle('success')
          setNotification(`${name} was deleted`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
      }).catch(err => {
        setNotificationStyle('error')
        setNotification(`${name} does not exist`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification = {notification} notificationStyle={notificationStyle}/>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange} />
      <h3>Add New</h3>
      <PersonForm handleSubmit = {handleSubmit} />
      <h3>Numbers</h3>
      <Persons persons = {filteredPersons} handleDelete = {handleDelete} />
    </div>
  )
}

export default App