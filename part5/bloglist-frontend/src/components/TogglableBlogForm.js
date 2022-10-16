import Togglable from './Togglable'
import BlogForm from './BlogForm'

const TogglableBlogForm = ({ user, handleCreate }) => {
    if (user === null) {
        return null
    } else {
        return (
            <Togglable showLabel = "New Blog" hideLabel = "Cancel">
                <BlogForm handleCreate = {handleCreate} />
            </Togglable>
        )
    }
}

export default TogglableBlogForm
