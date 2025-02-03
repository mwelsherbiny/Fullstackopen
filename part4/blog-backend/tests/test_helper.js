const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "First Blog Post",
    author: "John Doe",
    url: "http://example.com/first-blog-post",
    likes: 10,
  },
  {
    title: "Second Blog Post",
    author: "Jane Doe",
    url: "http://example.com/second-blog-post",
    likes: 20,
  },
  {
    title: "Third Blog Post",
    author: "Jim Doe",
    url: "http://example.com/third-blog-post",
    likes: 30,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const notInDbId = async () => {
  const blog = new Blog({
    title: "Fifth Blog Post",
    author: "Kal Doe",
    url: "http://example.com/random-blog-post",
    likes: 15,
  });

  const result = await blog.save();
  const id = result.id;
  await Blog.findByIdAndDelete(id);

  return id;
};

module.exports = {
  initialBlogs,
  blogsInDb,
  notInDbId,
};
