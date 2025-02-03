const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id;
  await Blog.findByIdAndDelete(blogId);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const blogId = request.params.id;
  const blog = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, {
    new: true,
    runValidators: true,
  });
  response.json(updatedBlog);
});

module.exports = blogRouter;
