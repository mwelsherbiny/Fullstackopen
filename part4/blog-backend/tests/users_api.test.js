const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");
const { test, after, beforeEach, describe } = require("node:test");
const { default: mongoose } = require("mongoose");

const api = supertest(app);

describe("when there are no users initially saved", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("valid users are created successfuly", async () => {
    const user = {
      username: "testuser",
      name: "Test User",
      password: "1234",
    };

    await api.post("/api/users").send(user).expect(201);
  });
  test("users with invalid passwords or usernames are not created", async () => {
    const user1 = {
      username: "test",
      name: "Test User",
      password: "12",
    };
    const user2 = {
      username: "ch",
      name: "Test User",
      password: "1234",
    };

    await api.post("/api/users").send(user1).expect(400);
    await api.post("/api/users").send(user2).expect(400);
  });
});

describe("when there are users initially saved", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const userObjects = helper.initialUsers.map((user) => new User(user));
    const promiseArray = userObjects.map((user) => user.save());
    await Promise.all(promiseArray);
  });

  test("users with duplicated usernames can't be created", async () => {
    const user = helper.initialUsers[0];
    await api.post("/api/users").send(user).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
