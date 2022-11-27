const PersonForm = ({handleSubmit}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <p>name: <input name="name"/></p>
            <p>number: <input name="number"/></p>
            <button type="submit">add</button>
            </form>
        </div>
    )
}

export default PersonForm