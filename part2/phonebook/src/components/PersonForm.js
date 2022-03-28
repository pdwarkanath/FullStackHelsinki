const PersonForm = ({handleSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <p>name: <input value={newName} onChange={handleNameChange}/></p>
            <p>number: <input value={newNumber} onChange={handleNumberChange}/></p>
            <button type="submit">add</button>
            </form>
        </div>
    )
}

export default PersonForm