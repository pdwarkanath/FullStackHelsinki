import { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        const newBlog = {
        title: title,
        author: author,
        url: url
        }
        setTitle('')
        setAuthor('')
        setURL('')
        handleCreate(newBlog)
    }
    return (
    <>
    <h3>Create New</h3>
    <form onSubmit={handleSubmit}>
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
export default BlogForm