import { Header2 } from "./Headers"

const BlogForm = ({ handleSubmit, title, author, url, setTitle, setAuthor, setUrl }) => {
  return (
    <div>
      <Header2 text='Create new blog' />
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}       

export default BlogForm
