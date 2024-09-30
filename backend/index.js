const express = require("express");
const dbConnection = require("./src/db_connection/db");
const dotenv = require("dotenv").config();
const userRouter = require("./src/routes/user.routes");
const todoRouter = require("./src/routes/todo.routes");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/todo", todoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server at running at ${PORT}`);
  dbConnection();
});
