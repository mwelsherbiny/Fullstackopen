const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const blog = new Blog(request.body);
  const user = request.user;
  blog.user = user.id;

  const result = await blog.save();
  user.blogs = user.blogs.concat(result.id);
  await user.save();

  response.status(201).json(result);
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    const blogId = request.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(204).json({ error: "Blog not found" });
    }
    if (user.id !== blog.user.toString()) {
      return response
        .status(401)
        .json({ error: "Unauthorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);
    response.status(204).end();
  }
);

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
