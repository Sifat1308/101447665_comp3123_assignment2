const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

router.post("/", async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json(employee);
});

router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

router.get("/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
});

router.put("/:id", async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(employee);
});

router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.send("Employee deleted");
});

router.get("/search", async (req, res) => {
  const { query } = req.query;
  const employees = await Employee.find({
    $or: [
      { department: { $regex: query, $options: "i" } },
      { position: { $regex: query, $options: "i" } },
    ],
  });
  res.json(employees);
});

module.exports = router;
