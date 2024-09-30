const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const {
  CreateTodo,
  ReadTodo,
  SingleTodo,
  UpdateTodo,
  DeleteTodo,
} = require("../contoller/todo.controller");

router.post("/create", authenticate, CreateTodo);
router.get("/read", ReadTodo);
router.get("/single/:id", SingleTodo);
router.put("/update/:id", authenticate, UpdateTodo);
router.delete("/delete/:id", authenticate, DeleteTodo);

module.exports = router;
