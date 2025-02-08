const Blog = require("../models/blog");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

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

const user = {
  username: "root",
  name: "Superuser",
  password: "1234",
};

const initialUsers = [
  {
    username: "root",
    name: "Superuser",
    passwordHash: "askdjmaopsdj1232kneo21qnep2e",
  },
  {
    username: "user",
    name: "Regular User",
    passwordHash: "afsagmaopsdj1232kneo21qnep2e",
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

const getToken = async (user) => {
  const response = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  return response.body.token;
};

module.exports = {
  initialBlogs,
  blogsInDb,
  notInDbId,
  user,
  initialUsers,
  getToken,
};
