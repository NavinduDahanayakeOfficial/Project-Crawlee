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
import { adminOnly, protect } from "../utils/verifyToken.js";


const router = express.Router();

//CREATE
router.post("/",  protect, createCourse);

//UPDATE
router.put("/:id",  protect,  updateCourse);

//DELETE
router.delete("/:id",  protect, deleteCourse);

//GET
router.get("/:id", getCourse);

//GETALL
router.get("/", getCourses);

//change the course status
router.patch("/:courseId/changeStatus",  protect, adminOnly, changeCourseStatus);


export default router;
