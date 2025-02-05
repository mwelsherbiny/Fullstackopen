const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const { default: mongoose } = require("mongoose");

const api = supertest(app);

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    let user = helper.user;
    const addedUser = await api.post("/api/users").send(user);

    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((blog) => {
      blog.user = addedUser.body.id;
      return new Blog(blog);
    });
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("correct number of blogs in returned", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    assert(response.body[0].id);
  });

  describe("addition of a new blog", () => {
    test("blogs are added correctly", async () => {
      const newBlog = {
        title: "new Blog Post",
        author: "Jackie Doe",
        url: "http://example.com/new-blog-post",
        likes: 60,
      };

      const token = await helper.getToken(helper.user);

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
    });

    test("like property defaults to 0", async () => {
      const newBlog = {
        title: "new Blog Post",
        author: "Jackie Doe",
        url: "http://example.com/new-blog-post",
      };

      const token = await helper.getToken(helper.user);

      const result = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201);

      assert.strictEqual(result.body.likes, 0);
    });

    test("reject addition title and url properties are missing", async () => {
      const missingTitleBlog = {
        author: "Jackie Doe",
        url: "http://example.com/new-blog-post",
        likes: 60,
      };

      const missingUrlBlog = {
        author: "Jackie Doe",
        url: "http://example.com/new-blog-post",
        likes: 60,
      };

      const token = await helper.getToken(helper.user);

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(missingTitleBlog)
        .expect(400);
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(missingUrlBlog)
        .expect(400);
    });

    test("reject addition if token is missing", async () => {
      const newBlog = {
        title: "new Blog Post",
        author: "Jackie Doe",
        url: "http://example.com/new-blog-post",
        likes: 60,
      };

      await api.post("/api/blogs").send(newBlog).expect(401);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      const token = await helper.getToken(helper.user);

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map((blog) => blog.title);
      assert(!titles.includes(blogToDelete.title));
    });

    test("returns status code 204 if id is not found", async () => {
      const invalidId = await helper.notInDbId();

      const token = await helper.getToken(helper.user);

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
    });

    test("returns status code 400 if id is invalid", async () => {
      const invalidId = "1234567890";

      const token = await helper.getToken(helper.user);

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
    });
  });

  describe("updating a blog", () => {
    test("succeeds with status code 200 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedBlog = { ...blogToUpdate, likes: 100 };
      const result = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200);

      assert.strictEqual(result.body.likes, 100);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
