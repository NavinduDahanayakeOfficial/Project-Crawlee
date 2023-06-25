import express, { Router } from "express";
import { createError } from "../utils/error.js";
import {
  changeCourseStatus,
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/courseController.js";


const router = express.Router();

//CREATE
router.post("/", createCourse);

//UPDATE
router.put("/:id",  updateCourse);

//DELETE
router.delete("/:id", deleteCourse);

//GET
router.get("/:id", getCourse);

//GETALL
router.get("/", getCourses);

//change the course status
router.patch("/:courseId/changeStatus", changeCourseStatus);


export default router;
