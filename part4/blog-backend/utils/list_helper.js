const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;

  blogs.forEach((blog) => {
    sum += blog.likes;
  });

  return sum;
};

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return null;

  let blogIndex = 0;

  blogs.forEach((blog, index) => {
    if (blog.likes > blogs[blogIndex].likes) {
      blogIndex = index;
    }
  });

  return blogs[blogIndex];
};

const mostBlogs = (blogs) => {
  if (blogs.length < 1) return null;

  let authorsBlogsCount = {};

  for (let i = 0; i < blogs.length; i++) {
    if (authorsBlogsCount[blogs[i].author]) {
      authorsBlogsCount[blogs[i].author] += 1;
    } else {
      authorsBlogsCount[blogs[i].author] = 1;
    }
  }

  let author = null;
  let blogsCount = 0;
  for (const [key, value] of Object.entries(authorsBlogsCount)) {
    if (value > blogsCount) {
      author = key;
      blogsCount = value;
    }
  }

  return { author, blogs: blogsCount };
};

const mostLikes = (blogs) => {
  if (blogs.length < 1) return null;

  let authorsLikeCount = {};

  for (let i = 0; i < blogs.length; i++) {
    if (authorsLikeCount[blogs[i].author]) {
      authorsLikeCount[blogs[i].author] += blogs[i].likes;
    } else {
      authorsLikeCount[blogs[i].author] = blogs[i].likes;
    }
  }

  let author = null;
  let likeCount = 0;
  for (const [key, value] of Object.entries(authorsLikeCount)) {
    if (value > likeCount) {
      author = key;
      likeCount = value;
    }
  }

  return { author, likes: likeCount };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
