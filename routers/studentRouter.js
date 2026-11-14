import express from "express";

import { getStudents, createStudent, deleteStudent } from "../controllers/studentController.js"; //{bcz stucontroller. have more functions, then separte one functions using {} ,normal export way

const studentRouter = express.Router();

studentRouter.post("/", createStudent)

studentRouter.get("/", getStudents)

studentRouter.delete("/", deleteStudent)

export default studentRouter;