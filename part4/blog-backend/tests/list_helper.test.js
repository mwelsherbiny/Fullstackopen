const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const blogs = [
    { title: "title1", author: "author1", url: "url1", likes: 1 },
    { title: "title2", author: "author2", url: "url2", likes: 2 },
    { title: "title3", author: "author3", url: "url3", likes: 3 },
  ];

  test("total likes for empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("total likes for one blog is the likes of that blog", () => {
    const result = listHelper.totalLikes([blogs[0]]);
    assert.strictEqual(result, blogs[0].likes);
  });

  test("total likes for multiple blogs is the sum of the likes of all blogs", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 6);
  });
});

describe("favorite blog", () => {
  const blogs = [
    { title: "title1", author: "author1", url: "url1", likes: 1 },
    { title: "title2", author: "author2", url: "url2", likes: 2 },
    { title: "title3", author: "author3", url: "url3", likes: 3 },
  ];

  test("favorite blog for empty list is null", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });

  test("favorite blog for one blog is that blog", () => {
    const result = listHelper.favoriteBlog([blogs[0]]);
    assert.deepStrictEqual(result, blogs[0]);
  });

  test("favorite blog for multiple blogs is the blog with the most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, blogs[2]);
  });
});

describe("most blogs", () => {
  const blogs = [
    { title: "title1", author: "author1", url: "url1", likes: 1 },
    { title: "title2", author: "author2", url: "url2", likes: 2 },
    { title: "title3", author: "author3", url: "url3", likes: 3 },
    { title: "title4", author: "author1", url: "url4", likes: 4 },
  ];

  test("most blogs for empty list is null", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });

  test("most blogs for one blog is that author with one blog", () => {
    const result = listHelper.mostBlogs([blogs[0]]);
    assert.deepStrictEqual(result, { author: "author1", blogs: 1 });
  });

  test("most blogs for multiple blogs is the author with the most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, { author: "author1", blogs: 2 });
  });
});

describe("most likes", () => {
  const blogs = [
    { title: "title1", author: "author1", url: "url1", likes: 1 },
    { title: "title2", author: "author2", url: "url2", likes: 2 },
    { title: "title3", author: "author3", url: "url3", likes: 3 },
    { title: "title4", author: "author1", url: "url4", likes: 4 },
  ];

  test("most likes for empty list is null", () => {
    const result = listHelper.mostLikes([]);
    assert.strictEqual(result, null);
  });

  test("most likes for one blog is that author with the likes of that blog", () => {
    const result = listHelper.mostLikes([blogs[0]]);
    assert.deepStrictEqual(result, { author: "author1", likes: 1 });
  });

  test("most likes for multiple blogs is the author with the most likes", () => {
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, { author: "author1", likes: 5 });
  });
});
