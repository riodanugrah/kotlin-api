const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Contoh data pengguna
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

// Endpoint untuk mendapatkan semua pengguna
app.get("/users", (req, res) => {
  res.json(users);
});

// Endpoint untuk menambahkan pengguna baru
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Endpoint untuk mengubah data pengguna
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUser = {
    id: id,
    name: req.body.name,
    email: req.body.email,
  };

  let userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Endpoint untuk menghapus pengguna
app.delete("/users/:id", (req, res) => {
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
