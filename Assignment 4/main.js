const { randomUUID } = require("node:crypto");
const express = require("express");
const fs = require("node:fs");
const path = require("path");

const app = express();
app.use(express.json());
const port = 3000;

const usersFilePath = path.join(__dirname, "users.json");

const readUsers = () => {
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// 1
app.post("/user", (req, res) => {
  const { id, name, email, age } = req.body;
  const users = readUsers();

  const emailExists = users.find((user) => user.email === email);
  if (emailExists) {
    return res.status(409).json({ message: "Email exists", user: emailExists });
  }

  users.push({ id, name, email, age });
  writeUsers(users);

  return res.status(201).json({ message: "User created successfully", users });
});

// 2
app.patch("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, age } = req.body;
  const users = readUsers();

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User ID not found" });
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (age) user.age = age;

  writeUsers(users);

  return res.status(200).json({ message: "User updated successfully", user });
});

// 3
app.delete("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const users = readUsers();

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User ID not found" });
  }

  users.splice(userIndex, 1);
  writeUsers(users);

  return res.status(200).json({ message: "User deleted successfully", users });
});

// 4 localhost:3000/user/getByName?name=john
app.get("/user/getByName", (req, res) => {
  const { name } = req.query;
  const users = readUsers();

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const matchedUsers = users.filter(
    (u) => u.name.toLowerCase() === name.toLowerCase()
  );

  if (matchedUsers.length === 0) {
    return res.status(404).json({ message: "No user found with this name" });
  }

  return res.status(200).json({ users: matchedUsers });
});

// 5
app.get("/user", (req, res) => {
  const users = readUsers();
  return res.status(200).json({ users });
});

// 6
app.get("/user/filter", (req, res) => {
  const minAge = parseInt(req.query.minAge);
  const users = readUsers();

  if (!minAge) {
    return res.status(400).json({ message: "minAge is required" });
  }

  const filterUsers = users.filter((u) => u.age >= minAge);

  if (filterUsers.length === 0) {
    return res.status(404).json({ message: "No user found with this age" });
  }

  return res.status(200).json({ users: filterUsers });
});

// 7
app.get("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const users = readUsers();

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User found", user });
});

// server
app.listen(port, () => {
  console.log(`Server is running on..... ${port} 🚀`);
});
