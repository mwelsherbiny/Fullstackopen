import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  async function handleSubmission(event) {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (error) {
      console.log(error);
      setNotification({
        error: true,
        message: error.response.data.error,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }

  function logout() {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  }

  if (user === null) {
    return (
      <>
        <Notification notification={notification} />

        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleSubmission}>
            <label htmlFor="username">username </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            />
            <br></br>
            <label htmlFor="password">password </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
            <br></br>
            <button type="submit">Login</button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <Notification notification={notification} />

      <div>
        <h2>blogs</h2>
        <span>{user.name} logged-in</span>
        <button onClick={logout}>logout</button>
        <br></br>
        <br></br>

        <Togglable buttonLabel="new blog">
          <BlogForm
            blogService={blogService}
            blogs={blogs}
            setBlogs={setBlogs}
            setNotification={setNotification}
          />
        </Togglable>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogsService={blogService}
            setNotification={setNotification}
            username={user.username}
          />
        ))}
      </div>
    </>
  );
};

export default App;
