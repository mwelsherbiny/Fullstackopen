import { useState } from "react";

const Blog = ({ blog, blogsService, setNotification, username }) => {
  const [isViewing, setIsViewing] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [removed, setRemoved] = useState(false);

  const updateLikes = async () => {
    try {
      await blogsService.updateBlog({ ...blog, likes: likes + 1 });
      setLikes(likes + 1);
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
  };

  const removeBlog = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }

    try {
      await blogsService.removeBlog(blog.id);
      setRemoved(true);
    } catch (error) {
      setNotification({
        error: true,
        message: error.response.data.error,
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const blogStyle = {
    display: removed ? "none" : "",
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (isViewing) {
    return (
      <div style={blogStyle}>
        <span>
          {blog.title}
          <button onClick={() => setIsViewing(false)}>Hide</button>
        </span>
        <br></br>
        <span>{blog.url}</span>
        <br></br>
        <span>
          Likes {likes}
          <button onClick={updateLikes}>Like</button>
        </span>
        <br></br>
        <span>{blog.author}</span>
        <br></br>

        {blog.user.username === username && (
          <button onClick={removeBlog}>Remove</button>
        )}
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <span>{blog.title}</span>
        <button onClick={() => setIsViewing(true)}>View</button>
      </div>
    );
  }
};

export default Blog;
