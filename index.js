const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const data = require("./data");
const port = 3000;

// Middleware bodyparser
app.use(bodyParser.json());
app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email.indexOf("@") == -1) {
    return res.status(400).json({
      status: "error",
      error: "Invalid data. Please try again",
    });
  }

  const checkUser = data.find(
    (user) => user.email === email && user.password === password
  );
  if (checkUser.length === 0) {
    return res.status(400).json({
      status: "error",
      error: "Invalid email or password",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Login successful",
    data: checkUser,
  });
});

//signup -post
app.post("/register", (req, res) => {
  const { name, email, password, age } = req.body;

  const userId = Math.floor(Math.random() * 10000);

  const isAlreadyRegistered = data.find((user) => user.email === email);

  if (isAlreadyRegistered) {
    res.status(400).json({
      status: "error",
      error: "Email is already registered",
    });
  } else {
    data.push({
      id: userId,
      name: name,
      email: email,
      password: password,
      age: age,
    });
    res.status(200).json({
      status: "success",
      message: "User registered successfully",
      data,
    });
  }
});

//all-users  -get

app.get("/all-users", (req, res) => {
  const users = data;
  res.status(200).json({
    status: "success",
    message: "All users",
    users,
  });
});

//user/me/:id -get
app.get("/users/:id", (req, res) => {
  const user = data.find((user) => user.id === parseInt(req.params.id));
  res.status(200).json({
    status: "success",
    message: "Single user",
    user,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
