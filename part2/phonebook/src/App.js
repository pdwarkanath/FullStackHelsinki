import { useState } from 'react'

const Numbers = ({persons}) => {
  return (
    <>
    {persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')  

  const handleNameChange = (event) => setNewName(event.target.value) 
  const handleNumberChange = (event) => setnewNumber(event.target.value) 
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const isNameInPersons = persons.reduce((result, person) => result || person.name == newName, false)

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
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons = {persons}/>
      <p>{newName}</p>
    </div>
  )
}

export default App