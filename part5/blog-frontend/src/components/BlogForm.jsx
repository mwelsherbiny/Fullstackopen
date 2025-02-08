import { useState } from "react";

const BlogForm = ({ blogService, blogs, setBlogs, setNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  async function submitBlog(event) {
    event.preventDefault();
    try {
      const blog = await blogService.post({
        title: title.trim(),
        author: author.trim(),
        url: url.trim(),
      });

      setBlogs([...blogs, blog]);

      setNotification({
        error: false,
        message: `Blog ${blog.title} by ${blog.author} added`,
      });
    } catch (error) {
      console.log(error);
      setNotification({
        error: true,
        message: error.response.data.error,
      });
    }

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={submitBlog}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
        <br></br>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        />
        <br></br>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        />
        <br></br>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
