const BlogForm = ({ user, handleCreate, title, setTitle, author, setAuthor, url, setURL }) => {
    if (user === null) {
        return null
    } else {
        return (
        <>
        <h3>Create New</h3>
        <form onSubmit={handleCreate}>
            <div>
                title  
                <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author  
                <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url  
                <input
                type="text"
                value={url}
                name="URL"
                onChange={({ target }) => setURL(target.value)}
                />
            </div>
            <button type="submit">Create</button>
        </form>
        </>
        )
    }
}
export default BlogForm