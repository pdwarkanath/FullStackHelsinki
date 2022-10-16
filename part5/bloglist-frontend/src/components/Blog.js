import './styles/blog.css'
import Togglable from './Togglable'
import RemoveButton from './RemoveButton'
import LikeButton from './LikeButton'
const Blog = ({user, blog, handleLike, handleDelete}) => {
  return (
    <div className="blog">
      {blog.title} {blog.author}
      <Togglable showLabel = "view" hideLabel = "hide">
        URL: {blog.url}<br/>
        Likes: {blog.likes} {user ? <LikeButton handleLike={handleLike}/> : <></>}<br/> 
        {blog.user ? blog.user.name : <></>}<br/>
        {user && blog.user ? (user.id === blog.user.id ? <RemoveButton handleDelete={handleDelete}/> : <></>) : <></>}
      </Togglable>
    </div>  
  )
}
export default Blog